import { execSync } from "child_process";
import { platform } from "os";
import { join, resolve } from "path";
import { existsSync, readdirSync } from "fs";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const config = {
  windowsScript: "install_postgresql.ps1",
  linuxScript: "install_postgresql.sh",
  scriptsDir: resolve(__dirname, "..", "install"),
  postgresPassword: process.env.POSTGRES_PASSWORD,
  windowsPaths: [
    "C:\\Program Files\\PostgreSQL\\16\\bin",
    "C:\\PostgreSQL\\bin",
  ],
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
};

function isPostgreSQLInstalled(): boolean {
  try {
    const osPlatform = platform();

    if (osPlatform === "win32") {
      try {
        const processes = execSync('tasklist /FI "IMAGENAME eq postgres.exe"', {
          shell: "cmd.exe",
          encoding: "utf-8",
          windowsHide: true,
        });
        if (processes.includes("postgres.exe")) return true;
      } catch {}

      try {
        const regCheck = execSync('reg query "HKLM\\SOFTWARE\\PostgreSQL" /s', {
          shell: "powershell.exe",
          encoding: "utf-8",
        });
        if (regCheck.includes("PostgreSQL")) return true;
      } catch {}

      return config.windowsPaths.some((path) =>
        existsSync(join(path, "psql.exe"))
      );
    }

    try {
      execSync("command -v psql", { stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  } catch (error) {
    return false;
  }
}

function getPostgreSQLVersion(): string {
  try {
    if (platform() === "win32") {
      for (const path of config.windowsPaths) {
        const psqlPath = join(path, "psql.exe");
        if (existsSync(psqlPath)) {
          return execSync(`"${psqlPath}" --version`, {
            encoding: "utf-8",
            windowsHide: true,
          }).trim();
        }
      }
      return "Version unknown (path not in registry)";
    }
    return execSync("psql --version", { encoding: "utf-8" }).trim();
  } catch (error) {
    return "Version unavailable";
  }
}

function verifyScriptPath(scriptPath: string): void {
  if (!existsSync(scriptPath)) {
    const files = readdirSync(config.scriptsDir);
    throw new Error(
      `Installation script not found! 
      Expected: ${scriptPath}
      Available files: ${files.join(", ")}`
    );
  }
}

async function runInstallation(): Promise<void> {
  const osPlatform = platform();
  const scriptName =
    osPlatform === "win32" ? config.windowsScript : config.linuxScript;

  const scriptPath = join(config.scriptsDir, scriptName);
  verifyScriptPath(scriptPath);

  console.log(`Starting installation from: ${scriptPath}`);

  try {
    if (osPlatform === "win32") {
      const escapedPath = scriptPath.replace(/ /g, "` ");
      execSync(
        `powershell -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File \\"${escapedPath}\\" -Password \\"${config.postgresPassword}\\"' -Verb RunAs -Wait"`,
        {
          stdio: "inherit",
          shell: "powershell.exe",
          windowsHide: true,
        }
      );
    } else {
      execSync(`sudo bash ${scriptPath} "${config.postgresPassword}"`, {
        stdio: "inherit",
        shell: "/bin/bash",
      });
    }
  } catch (error: any) {
    console.error("Error during installation:", error.message);
    throw new Error(
      `Installation failed: ${error.stderr?.toString() || error.message}`
    );
  }
}

function checkDatabaseExists(): boolean {
  try {
    const osPlatform = platform();
    let command: string;

    if (osPlatform === "win32") {
      const psqlPath = config.windowsPaths
        .map((path) => join(path, "psql.exe"))
        .find((path) => existsSync(path));

      command = `"${psqlPath}" -U postgres -c "SELECT 1 FROM pg_database WHERE datname='${config.dbName}'" -t`;
    } else {
      command = `sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname='${config.dbName}'" -t`;
    }

    const result = execSync(command, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();

    return result === "1";
  } catch (error) {
    return false;
  }
}

function setupDatabase() {
  try {
    console.log("[DB] Checking database setup...");

    const osPlatform = platform();
    const psqlPath = osPlatform === "win32"
      ? config.windowsPaths
          .map((path) => join(path, "psql.exe"))
          .find((path) => existsSync(path))
      : "psql";

    const createUserCmd =
      osPlatform === "win32"
        ? `"${psqlPath}" -U postgres -c "CREATE USER ${config.dbUser } WITH PASSWORD '${config.dbPassword}'"`
        : `sudo -u postgres psql -c "CREATE USER ${config.dbUser } WITH PASSWORD '${config.dbPassword}'"`;

    execSync(createUserCmd, { stdio: "ignore" });

    const createDBCmd =
      osPlatform === "win32"
        ? `"${psqlPath}" -U postgres -c "CREATE DATABASE ${config.dbName} OWNER ${config.dbUser }"`
        : `sudo -u postgres createdb -O ${config.dbUser } ${config.dbName}`;

    execSync(createDBCmd, { stdio: "ignore" });

    console.log("[DB] Database setup completed");
  } catch (error: any) {
    console.error("[DB] Error during database setup:", error.message);
  }
}

async function main() {
  try {
    console.log("[1/4] Starting PostgreSQL check...");

    if (isPostgreSQLInstalled()) {
      console.log("[2/4] Status:", "✓ PostgreSQL detected");
      console.log("[3/4] Version:", getPostgreSQLVersion());
      return;
    }

    console.log("[2/4] Starting installation...");
    await runInstallation();

    console.log("[3/4] Verifying installation...");
    if (!isPostgreSQLInstalled()) {
      throw new Error("Installation verification failed");
    }

    if (!checkDatabaseExists()) {
      setupDatabase();
    }

    console.log("[4/4] Status:", "✓ PostgreSQL installed successfully");
  } catch (error: any) {
    console.error("[ERROR]", error.message);
    process.exit(1);
  }
}

export default main;