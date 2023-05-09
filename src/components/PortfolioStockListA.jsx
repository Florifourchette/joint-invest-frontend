import React, { useEffect, useState } from 'react';
import { Image, List } from 'semantic-ui-react';
import { useAppContext } from '../contexts/AppContext';

const StockListA = ({ item, externalAPIstocks, sharePrice }) => {
  const { contextStockData } = useAppContext();
  const [logo, setLogo] = useState();
  const [APIStockChange, setAPIStockChange] = useState(0);

  useEffect(() => {
    //   const theLogo = contextStockData.find(
    //     (alogo) => alogo.companyid == item.company_id
    //   );
    //   setLogo(theLogo.logo);
    if (Object.values(sharePrice).length !== 1) {
      setAPIStockChange(
        parseFloat(externalAPIstocks[item.company_id]?.change)
      );
    } else {
      setAPIStockChange(parseFloat(externalAPIstocks?.change));
    }
  }, []);

  return (
    <>
      <div>
        <List relaxed="very" style={{ backgroundcolor: '#FFD600' }}>
          <List.Item className="d-flex one-stock">
            <div className="stock-shade">
              {/* <Image
                style={{ height: '40px', width: '40px' }}
                avatar
                src={
                  logo
                    ? `/company_logos/${logo}`
                    : `/company_logos/NO_LOGO.png`
                }
              /> */}
              <List.Content className="container d-flex w-100">
                <div className="d-flex justify-content-start flex-column">
                  <List.Header
                    style={{ color: '#31231E', fontSize: '1.1em' }}
                  >
                    {item.company_id}
                  </List.Header>
                  <List.Description
                    style={{
                      fontWeight: '800',
                      color: '#84714F',
                      fontSize: '1em',
                      marginTop: '0.1rem',
                    }}
                  >
                    {parseFloat(sharePrice[item.company_id]).toFixed(
                      2
                    )}
                  </List.Description>
                </div>
                <div className="d-flex justify-content-end w-100 align-items-center">
                  {APIStockChange > 0 ? (
                    <List.Description
                      style={{
                        fontWeight: '600',
                        color: '#698D1B',
                        fontSize: '1.1em',
                      }}
                    >
                      +{APIStockChange.toFixed(2)}% / +
                      {(
                        parseFloat(sharePrice[item.company_id]) *
                        (APIStockChange / 100)
                      ).toFixed(2)}
                      $
                    </List.Description>
                  ) : (
                    <List.Description
                      style={{
                        fontWeight: '600',
                        color: '#922727',
                        fontSize: '1.1em',
                      }}
                    >
                      {APIStockChange.toFixed(2)}% /
                      {(
                        parseFloat(sharePrice[item.company_id]) *
                        (APIStockChange / 100)
                      ).toFixed(2)}
                      $
                    </List.Description>
                  )}
                </div>
              </List.Content>
            </div>
          </List.Item>
        </List>
      </div>
    </>
  );
};

export default StockListA;
