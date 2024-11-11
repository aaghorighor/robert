import React from 'react';
import { Header } from 'suftnet-ui-kit';
import { FaBars} from 'react-icons/fa';
import Logo from './logo';
import Menu from './menu';
import useSticky from '../../../hooks/useSticky';
import useMobile from '../../../hooks/useMobile';
import { ContainerWindow } from '../shared/app-container';

const SiteHeader = () => {
  const { isMobile } = useMobile();
  const sticky = useSticky(200);

  return (
    <Header
      justifyContent="center"
      direction="column"
      alignItems="center"
      className={`bg-warning1 header p-0 ${sticky ? 'sticky' : ''}`}
    >
      <ContainerWindow width={70}>
        <nav
          className={`flex-row justify-content-between align-items-center w-100 ${isMobile ? 'flex__mobile w-100 p-4' : ''
            } `}
        >
          <Logo isMobile={isMobile} />
          {!isMobile ? (
            <>
              <Menu />

            </>
          ) : (
            <>
              <FaBars
                size={30}
                className="hamburger"
                onClick={() => {
                  setIsPanelOpen(true);
                }}
              />
            </>
          )}
        </nav>
      </ContainerWindow>

    </Header>
  );
};

export default SiteHeader;
