import sequelize from "../db";
import { DataTypes, Model, Optional } from "sequelize";

// Определяем интерфейс для User
interface UserAttributes {
  id: string;
  name?: string;
  email: string;
  birthday?: string;
  password?: string;
  token?: string;
  img?: string;
}

// Определяем интерфейс для создания User
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name?: string;
  public email!: string;
  public birthday?: string;
  public password?: string;
  public token?: string;
  public img?: string;
}

// Определяем модель User
User .init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  birthday: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING(512),
    allowNull: true,
    unique: true,
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'Users',
});

// Определяем интерфейс для Channel
interface ChannelAttributes {
  id: string;
  streamId: string;
  name: string;
  followers?: number;
}

// Определяем интерфейс для создания Channel
interface ChannelCreationAttributes extends Optional<ChannelAttributes, 'id'> {}

class Channel extends Model<ChannelAttributes, ChannelCreationAttributes> implements ChannelAttributes {
  public id!: string;
  public streamId!: string;
  public name!: string;
  public followers?: number;
}

// Определяем модель Channel
Channel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  streamId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  followers: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'Channels',
});

// Определяем интерфейс для StreamRecordings
interface StreamRecordingAttributes {
  id: string;
  channelId: string;
  vidio: string;
}

// Определяем интерфейс для создания StreamRecordings
interface StreamRecordingCreationAttributes extends Optional<StreamRecordingAttributes, 'id'> {}

class StreamRecording extends Model<StreamRecordingAttributes, StreamRecordingCreationAttributes> implements StreamRecordingAttributes {
  public id!: string;
  public channelId!: string;
  public vidio!: string;
}

// Определяем модель StreamRecordings
StreamRecording.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  channelId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  vidio: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'StreamRecordings',
});

export { User, Channel, StreamRecording };