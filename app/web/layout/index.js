import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import Header from '~web/component/Header';

const { withRouter, Route, Switch} = router;
const { Content}= Layout;

class IndexLayout extends PureComponent{
  render(){
    const { routerData, location} = this.props;

    return(
      <Layout>
        <Header />
      </Layout>
    )
  }
}