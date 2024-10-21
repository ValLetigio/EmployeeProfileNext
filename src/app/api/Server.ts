class Server {
    public url: string;
  
    constructor(isProduction: boolean) {
      const urls = {
        local: 'http://127.0.0.1:5000',
        server: 'https://flask-app-614461425863.asia-east1.run.app'
      };
  
      this.url = isProduction ? urls.server : urls.local;
    }
  }
  
  export default Server;
  