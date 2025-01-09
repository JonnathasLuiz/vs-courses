const mongoose = require('mongoose');

function connection() {
  // URL de conexão ao MongoDB
  const mongoURI = 'mongodb://localhost:27017/db_test';

  // Opções de conexão
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Conectar ao MongoDB
  mongoose.connect(mongoURI, options)
    .then(() => {
      console.log('Conectado ao MongoDB com sucesso!');
    })
    .catch((err) => {
      console.error('Erro ao conectar ao MongoDB:', err);
    });

  // Tratamento de eventos de conexão
  mongoose.connection.on('connected', () => {
    console.log('Mongoose conectado ao banco de dados.');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Erro na conexão do Mongoose:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose desconectado.');
  });

  // Opcional: Encerrar a conexão ao fechar a aplicação
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Conexão com MongoDB encerrada.');
    process.exit(0);
  });
}
module.exports = connection;