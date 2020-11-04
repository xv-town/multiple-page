import { Chart } from '@antv/g2';

export default function pie ({ id, data }) {
  const chart = new Chart({
    container: id,
    autoFit: data,
    height: 500,
    // theme: 'dark',
  });
  chart.data(data);
  chart.scale('percent', {
    formatter: (val) => {
      val = val * 100 + '%';
      return val;
    },
  });
  chart.coordinate('theta', {
    radius: 0.75,
    innerRadius: 0.6,
  });
  chart.tooltip({
    showTitle: false,
    showMarkers: false,
    itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
  });
  // 辅助文本
  // chart
  //   .annotation()
  //   .text({
  //     position: ['50%', '50%'],
  //     content: '主机',
  //     style: {
  //       fontSize: 14,
  //       fill: '#8c8c8c',
  //       textAlign: 'center',
  //     },
  //     offsetY: -20,
  //   })
  //   .text({
  //     position: ['50%', '50%'],
  //     content: '200',
  //     style: {
  //       fontSize: 20,
  //       fill: '#8c8c8c',
  //       textAlign: 'center',
  //     },
  //     offsetX: -10,
  //     offsetY: 20,
  //   })
  //   .text({
  //     position: ['50%', '50%'],
  //     content: '台',
  //     style: {
  //       fontSize: 14,
  //       fill: '#8c8c8c',
  //       textAlign: 'center',
  //     },
  //     offsetY: 20,
  //     offsetX: 20,
  //   });
  chart
    .interval()
    .adjust('stack')
    .position('percent')
    .color('item')
    .label('percent', (percent) => {
      return {
        content: (data) => {
          return `${percent * 100}%`;
        },
      };
    })
    .tooltip('item*count', (item, count) => {
      return {
        name: item,
        value: count,
      };
    });
  
  chart.interaction('element-active');
  
  chart.render();

  return chart;
}
