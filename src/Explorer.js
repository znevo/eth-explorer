import { ethers, utils } from "ethers";
import moment from 'moment';

class Explorer {
    constructor() {
      this.connectProvider();
    }

    connectProvider(network = "homestead") {
      this.provider && this.provider.off('block');
      this.provider = new ethers.providers.AlchemyProvider(network);
    }

    async getBlock(blockNumber) {
      const block = await this.provider.getBlock(blockNumber);

      return {
        number: parseInt(block.number),
        timestamp: block.timestamp,
        ago: this.ago(block.timestamp),
        transactions: block.transactions.length,
        hash: block.hash,
        nonce: utils.commify(parseInt(block.nonce)),
        difficulty: utils.commify(block._difficulty),
        gasUsed: utils.commify(block.gasUsed.toNumber()),
        gasLimit: utils.commify(block.gasLimit.toNumber()),
        blockspace: (100 / block.gasLimit.toNumber()) * block.gasUsed.toNumber(),
      }
    }

    ago(timestamp) {
      return moment.duration(Date.now()-(timestamp*1000)).humanize() + " ago";
    }

    toEth(wei) {
      return parseInt(wei) ? utils.formatEther(wei) : 0;
    }

    toGwei(wei) {
      return parseInt(wei) ? utils.formatUnits(wei, 'gwei') : 0;
    }

    commify(num) {
      return utils.commify(num);
    }
}

export default Explorer;
