import nft from '../../images/nft.jpg'

export function Nftcard2() {
    return (
      <div className="nft-card">
        <img src={nft} alt={nft} />
        <div className='nft-card-bottom'>

            <button className='--btn'>
                UnStake
            </button>
        </div>
      </div>
    );
  }
  
  