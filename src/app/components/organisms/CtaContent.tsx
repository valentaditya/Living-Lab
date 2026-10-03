import React from 'react';
import { TopIcon } from '../atoms/TopIcon';
import { SectionHeading } from '../atoms/SectionHeading';

import { ActionButtonGroup } from '../molecules/ActionButtonGroup';
import { TrustBadges } from '../molecules/TrustBadge';
import { SectionSubheading } from '../atoms/SectionSubHeading';


export const CtaContent: React.FC = () => (
  <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto px-4">
    <TopIcon />
    
    <SectionHeading>
      Mari Bergabung dalam Ekosistem<br className="hidden md:block" /> Kolaborasi Sungai Yogyakarta
    </SectionHeading>
    
    <SectionSubheading>
      Baik Anda seorang akademisi, mahasiswa, pegiat komunitas, ataupun mitra industri — mari sinergikan pengetahuan dan tindakan nyata untuk merawat masa depan sungai kita.
    </SectionSubheading>
    
    <ActionButtonGroup />
    
    <TrustBadges />
  </div>
);