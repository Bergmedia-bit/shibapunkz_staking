import nft from '../../images/nft.jpg'
import React from "react";
export interface istake {



    map(items: (title: any) => any): any;
}
export interface IStakeCard {
    items: istake,

}

     const Nftcard1: React.FC<IStakeCard> = ({ items }) => {

         return (

         <div>
             {items.map(value => {
                 return <div  className='nft-wrap'>
                     <div className="nft-card">
                         <img src={"https://gateway.pinata.cloud/"+value} alt={nft} />
                         <div className='nft-card-bottom'>
                             <button className='--btn'>
                                 Stake
                             </button>
                         </div>
                     </div>

                 </div>;
             })}
         </div>
     );







  }

export default Nftcard1;