# install_postgresql_windows.ps1
# Требует запуска от администратора

# Параметры установки
$version = "16.3-1"
$installDir = "C:\PostgreSQL"
$password = "admin"  # Замените на свой пароль

# URL для скачивания
$downloadUrl = "https://get.enterprisedb.com/postgresql/postgresql-${version}-windows-x64.exe"

# Проверка прав администратора
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

# Скачивание инсталлятора
$installerPath = "$env:TEMP\postgresql-installer.exe"
Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath

# Параметры для тихой установки
$installArgs = @(
    "--unattendedmodeui", "none",
    "--servicename", "postgresql-x64-16",
    "--servicepassword", $password,
    "--superpassword", $password,
    "--serverport", "5432",
    "--installer-language", "en",
    "--prefix", $installDir,
    "--datadir", "$installDir\data",
    "--disable-components", "stackbuilder"
)

# Запуск установки
Start-Process -FilePath $installerPath -ArgumentList $installArgs -Wait

# Проверка установки
if (Test-Path "$installDir\bin\psql.exe") {
    Write-Host "PostgreSQL успешно установлен в $installDir"
    # Добавление в PATH
    $env:Path += ";$installDir\bin"
    [Environment]::SetEnvironmentVariable("Path", $env:Path, [EnvironmentVariableTarget]::Machine)
} else {
    Write-Host "Ошибка установки PostgreSQL"
}

# Очистка
Remove-Item $installerPath