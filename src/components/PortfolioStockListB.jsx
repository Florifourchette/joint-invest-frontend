import React, { useEffect, useState } from 'react';
import { Image, List } from 'semantic-ui-react';
import { useAppContext } from '../contexts/AppContext';

const StockListB = ({ item, externalAPIstocks, sharePrice }) => {
  const [logo, setLogo] = useState();
  const { contextStockData } = useAppContext();

  useEffect(() => {
    const theLogo = contextStockData.find(
      (alogo) => alogo.companyid == item.company_id
    );
    setLogo(theLogo.logo);

    console.log(theLogo.logo);
  }, []);

  return (
    <>
      <div className="one-stock">
        <List relaxed="very">
          <List.Item className="d-flex">
            <div className="stock-shade">
              <Image
                style={{ height: '40px', width: '40px' }}
                avatar
                src={
                  logo
                    ? `/company_logos/${logo}`
                    : `/company_logos/NO_LOGO.png`
                }
              />
              <List.Content className="container d-flex w-100">
                <div>
                  <List.Header
                    className="d-flex flex-row text-nowrap "
                    style={{ color: '#31231E', fontSize: '1.1em' }}
                  >
                    {item.company_id} ({item.current_number_of_stocks}
                    )
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
                  {parseFloat(sharePrice[item.company_id]) -
                    item.average_price_buy >
                  0 ? (
                    <List.Description
                      style={{
                        fontWeight: '600',
                        color: '#698D1B',
                        fontSize: '1.1em',
                      }}
                    >
                      +
                      {(
                        parseFloat(sharePrice[item.company_id]) /
                        item.average_price_buy
                      ).toFixed(2)}
                      % / +
                      {(
                        parseFloat(sharePrice[item.company_id]) *
                          parseInt(item.current_number_of_stocks) -
                        item.average_price_buy *
                          parseInt(item.current_number_of_stocks)
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
                      {parseFloat(
                        (sharePrice[item.company_id] /
                          item.average_price_buy) *
                          100 -
                          100
                      ).toFixed(2)}
                      % /
                      {parseFloat(
                        (sharePrice[item.company_id] -
                          item.average_price_buy) *
                          parseInt(item.current_number_of_stocks)
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

export default StockListB;
