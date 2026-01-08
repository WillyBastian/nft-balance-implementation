import { useAccount, useBalance, useNetwork } from 'wagmi';
import { formatEther } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  
  // Use wagmi's useBalance hook
  const { 
    data: balance, 
    isLoading, 
    isError, 
    error 
  } = useBalance({
    address: address,
  });

  // Format to 4 decimal places
  const formatBalance = () => {
    if (isLoading) return 'Loading...';
    if (isError) return 'Error';
    if (!balance) return '0.0000';
    
    const value = Number(formatEther(balance.value));
    return value.toFixed(4);
  };

  // Get token symbol
  const getTokenSymbol = () => {
    if (balance?.symbol) return balance.symbol;
    
    // Default based on chain
    if (chain?.id === 137) return 'MATIC'; // Polygon
    if (chain?.id === 56) return 'BNB';    // BSC
    return 'ETH'; // Default
  };

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div style={{
      backgroundColor: '#0f172a',
      padding: '16px 24px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #1e293b'
    }}>
      
      {/* Logo Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>N</span>
        </div>
        <h1 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          NFT Marketplace
        </h1>
      </div>

      {/* Wallet & Balance Section */}
      <div>
        {isConnected && address ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* Network Indicator */}
            <div style={{
              backgroundColor: '#1e293b',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#10b981',
                borderRadius: '50%'
              }} />
              <span>{chain?.name || 'Unknown Network'}</span>
            </div>

            {/* Balance Display */}
            <div style={{
              background: 'linear-gradient(90deg, #7c3aed, #db2777)',
              padding: '10px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 'bold'
            }}>
              <span>💰</span>
              <span>{formatBalance()}</span>
              <span style={{ opacity: 0.9 }}>{getTokenSymbol()}</span>
            </div>

            {/* Wallet Address */}
            <div style={{
              backgroundColor: '#1e293b',
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid #475569',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}>
              {formatAddress(address)}
            </div>

            {/* Disconnect Button */}
            <button
              onClick={() => {/* Add disconnect logic here */}}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Disconnect
            </button>

          </div>
        ) : (
          <ConnectButton 
            label="Connect Wallet"
            showBalance={false}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
