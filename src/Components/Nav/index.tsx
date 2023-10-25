import { NavLink } from "react-router-dom";

export function Nav() {
  return (
    <div className='left-nav'>
      <nav>
        <ul>
          <li><NavLink to="/">
            Home

          </NavLink></li>
          <li><NavLink to="/campaign">
          Launch Campaign
          </NavLink></li>
          <li><NavLink to="/staking">
            NFT STaking
          </NavLink></li>
        
        </ul>     
      </nav>
    </div>
  );
}

