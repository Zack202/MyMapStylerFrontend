import React from 'react';

const Legend = (props) => {
  const legendColors = props.legendColors || [];
  const legendValues = props.legendValues || [];
  const mapColor = props.mapColor || '#000000';
  const legendName = props.legendName || 'Legend';

  const getColor = (value) => {
    const index = legendValues.indexOf(value);
    if (index !== -1 && index < legendColors.length) {
      return legendColors[index];
    }
    return mapColor;
  };

  const legendItems = legendValues.map((value, index) => {
    const legendColor = getColor(value);

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

    let label;
    if (index === 0) {
      label = `${value} <`;
    } else if (index === legendValues.length - 1) {
      label = `${value} >`;
    } else {
      label = `${legendValues[index - 1]} - ${value}`;
    }

    return (
      <div key={`legend-item-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        {renderColorSquare}
        <span>{label}</span>
      </div>
    );
  });

  return (
    <div className="legend" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000, background:'lightgrey', padding:'5px', borderRadius:'5px'}}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{legendName}</div>
      {legendItems}
    </div>
  );
};

export default Legend;
