import React from 'react';
import pie from './pie';

class Pie extends React.Component {
  componentDidMount () {
    this.paint(this.props.data);
  }
  shouldComponentUpdate (n) {
    this.paint(n.data);
    return false;
  }
  componentWillUnmount () {
    this.chart && this.chart.destroy();
  }
  paint (data) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = pie({
      id: 'home-pie',
      data
    });
  }
  render () {
    return <div
      id="home-pie"
      style={{
        height: '100%',
        backgroundColor: '#FFFFFF'
      }}
    >
    </div>
  }
}

export default Pie;
