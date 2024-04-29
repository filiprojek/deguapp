import { Sequelize } from 'sequelize';

let sequelize: Sequelize | null = null;

const connectDB = async () => {
  sequelize = new Sequelize({
    dialect: 'mariadb',
    host: 'localhost',
    username: 'your_username',
    password: 'your_password',
    database: 'your_database',
  });

  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const dropDB = async () => {
  if (sequelize) {
    try {
      await sequelize.drop();
      console.log('Database dropped successfully.');
    } catch (error) {
      console.error('Error dropping database:', error);
    } finally {
      await sequelize.close();
    }
  }
};

const dropTables = async () => {
  if (sequelize) {
    try {
      await sequelize.sync({ force: true });
      console.log('All tables dropped successfully.');
    } catch (error) {
      console.error('Error dropping tables:', error);
    } finally {
      await sequelize.close();
    }
  }
};

export { connectDB, dropDB, dropTables };
