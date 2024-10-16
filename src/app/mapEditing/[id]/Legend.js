import React from 'react';
import { useContext } from 'react';
import GlobalStoreContext from '../../store';

const Legend = (props) => {

  const { store } = useContext(GlobalStoreContext);

  const legendColors = props.legendColors || [];
  const legendValues = props.legendValues || [];
  const mapColor = props.mapColor || '#000000';
  const legendName = props.legendName || 'Legend';
  const dotColor = props.dotColor || '#000000';
  const radius = props.radius || 5;

  const getColor = (value) => {
    const index = value;//legendValues.indexOf(value); //old code makes the legend all the same color(was using cholo map idk abt other maps)
    if (index !== -1 && index < legendColors.length) {
      return legendColors[index];
    }
    return mapColor;
  };

  const legendItems = legendValues.map((value, index) => {
    const legendColor = getColor(index);//value); // old code makes legend all the same color (was using cholo map idk abt other maps)

    const renderColorSquare = (
      <div
        key={`color-square-${index}`}
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: legendColor,
          marginRight: '5px',
          border: '1px solid #000',
        }}
      />
    );

    const renderColorCircle = (
        <div
        key={`color-circle-${index}`}
        style={{
        width: radius * 2,
        height: radius * 2,
          backgroundColor: dotColor,
          marginRight: '5px',
          borderRadius: "50%"
        }}

      />
    );


    let label;
    if (store.currentMap && store.currentMap.mapType === 4){
    if (index === 0) {
      label = `${value} <`;
    } else if (index === legendValues.length - 1) {
      label = `${value} >`;
    } else {
      label = `${legendValues[index - 1]} - ${value}`;
    }
    }
    else{
      label = `${value}`;
    }

    return (
        <div key={`legend-item-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          {store.currentMap && store.currentMap.mapType && (
            store.currentMap.mapType === 2 || store.currentMap.mapType === 3
          ) ? (
            <>
              {renderColorCircle}
              <span>{label}</span>
            </>
          ) : (
            <>
              {renderColorSquare}
              <span>{label}</span>
            </>
          )}
        </div>
      );
  });

  return (
    <div className="legend" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000, background:'lightgrey', padding:'5px', borderRadius:'5px'}}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{legendName}</div>
      {store.currentMap && store.currentMap.mapType && (
        store.currentMap.mapType === 2 || store.currentMap.mapType === 3
      ) ? (
        legendItems.slice(0, 1)
      ) : (
        legendItems
      )}
    </div>
  );
}


export default Legend;
