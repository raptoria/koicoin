import React, { useCallback, useContext } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export interface SankeyProps {
  data: any;
}

export const SankeyGraph: React.FC<SankeyProps> = ({ data }) => {
  return (
    <ResponsiveSankey
      data={data}
      margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
      align="justify"
      colors={{ scheme: 'category10' }}
      nodeOpacity={1}
      nodeThickness={18}
      nodeInnerPadding={3}
      nodeSpacing={24}
      nodeBorderWidth={0}
      nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
      linkOpacity={0.5}
      linkHoverOthersOpacity={0.1}
      enableLinkGradient={true}
      labelPosition="outside"
      labelOrientation="vertical"
      labelPadding={16}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
      animate={true}
      motionStiffness={140}
      motionDamping={13}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          translateX: 130,
          itemWidth: 100,
          itemHeight: 14,
          itemDirection: 'right-to-left',
          itemsSpacing: 2,
          itemTextColor: '#999',
          symbolSize: 14,
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
};
