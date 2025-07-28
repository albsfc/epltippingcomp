
import React from 'react';

interface TeamLogoProps {
  teamName: string;
  className?: string;
}

// A comprehensive map for all teams and their common aliases to a reliable external logo URL from thesportsdb.com.
const teamLogoUrlMap: { [key: string]: string } = {
    'arsenal': 'https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png',
    'aston villa': 'https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png',
    'bournemouth': 'https://r2.thesportsdb.com/images/media/team/badge/y08nak1534071116.png',
    'brentford': 'https://r2.thesportsdb.com/images/media/team/badge/grv1aw1546453779.png',
    'brighton': 'https://r2.thesportsdb.com/images/media/team/badge/ywypts1448810904.png',
    'brighton & hove albion': 'https://r2.thesportsdb.com/images/media/team/badge/ywypts1448810904.png',
    'burnley': 'https://r2.thesportsdb.com/images/media/team/badge/ql7nl31686893820.png',
    'chelsea': 'https://r2.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png',
    'crystal palace': 'https://r2.thesportsdb.com/images/media/team/badge/ia6i3m1656014992.png',
    'everton': 'https://r2.thesportsdb.com/images/media/team/badge/eqayrf1523184794.png',
    'fulham': 'https://r2.thesportsdb.com/images/media/team/badge/xwwvyt1448811086.png',
    'leeds': 'https://r2.thesportsdb.com/images/media/team/badge/g0eqzw1598804097.png',
    'leeds united': 'https://r2.thesportsdb.com/images/media/team/badge/g0eqzw1598804097.png',
    'liverpool': 'https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png',
    'man city': 'https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png',
    'manchester city': 'https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png',
    'man utd': 'https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png',
    'manchester united': 'https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png',
    'newcastle': 'https://r2.thesportsdb.com/images/media/team/badge/lhwuiz1621593302.png',
    'newcastle united': 'https://r2.thesportsdb.com/images/media/team/badge/lhwuiz1621593302.png',
    "nott'm forest": 'https://r2.thesportsdb.com/images/media/team/badge/bk4qjs1546440351.png',
    'nottingham forest': 'https://r2.thesportsdb.com/images/media/team/badge/bk4qjs1546440351.png',
    'sunderland': 'https://r2.thesportsdb.com/images/media/team/badge/tprtus1448813498.png',
    'spurs': 'https://r2.thesportsdb.com/images/media/team/badge/dfyfhl1604094109.png',
    'tottenham hotspur': 'https://r2.thesportsdb.com/images/media/team/badge/dfyfhl1604094109.png',
    'west ham': 'https://r2.thesportsdb.com/images/media/team/badge/yutyxs1467459956.png',
    'west ham united': 'https://r2.thesportsdb.com/images/media/team/badge/yutyxs1467459956.png',
    'wolves': 'https://r2.thesportsdb.com/images/media/team/badge/u9qr031621593327.png',
    'wolverhampton wanderers': 'https://r2.thesportsdb.com/images/media/team/badge/u9qr031621593327.png',
};

const getLogoUrl = (teamName: string): string => {
  if (!teamName) return '';
  const lowerCaseTeamName = teamName.toLowerCase().trim();
  const logoUrl = teamLogoUrlMap[lowerCaseTeamName];

  if (logoUrl) {
    return logoUrl;
  }
  
  // This will help debug if a new, unmapped team name is introduced.
  console.warn(`Logo URL not found for team: '${teamName}'`);
  return ''; // Return an empty string if no logo is found
};

const TeamLogo: React.FC<TeamLogoProps> = ({ teamName, className = 'w-10 h-10' }) => {
  const logoUrl = getLogoUrl(teamName);
  
  // Don't render the img tag if the URL is invalid to prevent broken image icons.
  if (!logoUrl) {
      return null;
  }

  return (
    <img 
      src={logoUrl} 
      alt={`${teamName} logo`} 
      className={className} 
      style={{ objectFit: 'contain' }}
      onError={(e) => {
        // Log an error and hide the image if the external URL is broken or blocked.
        console.error(`Failed to load logo for ${teamName} at URL: ${logoUrl}`);
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};

export default TeamLogo;
