// HTTP server entry point — starts the Express application
import app from './app';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`🚀 NexaFlow server listening on port ${env.PORT}`);
});
