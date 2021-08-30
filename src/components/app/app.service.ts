import { Injectable } from '@nestjs/common';
import * as NetworkScanner from 'network-scanner-js';
const netScan = new NetworkScanner();

@Injectable()
export default class AppService {
  private config = {
    repeat: 1,
    size: 32,
    timeout: 0,
  };

  async getLatency() {
    const poll = await netScan.poll('google.com', this.config);
    return `Service server latency for Google.com = ${poll.res_avg}`;
  }
}
