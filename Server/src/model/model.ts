import { Sequelize, Model, DataTypes, BuildOptions, Optional } from 'sequelize';
import sequelize from "../db";


interface UserAttributes {
  id: string;
  name?: string;
  email: string;
  birthday?: string;
  password?: string;
  token?: string;
  img?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}


interface UserModel extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}
type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

const User = <UserStatic>sequelize.define<UserModel>('User', {
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
  tableName: 'Users',
  timestamps: true,
});


interface ChannelAttributes {
  id: string;
  streamId: string;
  name: string;
  followers?: number;
}

interface ChannelCreationAttributes extends Optional<ChannelAttributes, 'id'> {}

interface ChannelModel extends Model<ChannelAttributes, ChannelCreationAttributes>, ChannelAttributes {}
type ChannelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ChannelModel;
};

const Channel = <ChannelStatic>sequelize.define<ChannelModel>('Channel', {
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
  tableName: 'Channels',
  timestamps: true,
});


interface StreamRecordingAttributes {
  id: string;
  channelId: string;
  vidio: string;
}

interface StreamRecordingCreationAttributes extends Optional<StreamRecordingAttributes, 'id'> {}

interface StreamRecordingModel extends Model<StreamRecordingAttributes, StreamRecordingCreationAttributes>, StreamRecordingAttributes {}
type StreamRecordingStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): StreamRecordingModel;
};

const StreamRecording = <StreamRecordingStatic>sequelize.define<StreamRecordingModel>('StreamRecording', {
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
  tableName: 'StreamRecordings',
  timestamps: true,
});

export { User, Channel, StreamRecording };