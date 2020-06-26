import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TeaClippingItem from './TeaClippingItem';

//This test ensures the TeaClippingItem component is able to render without crashing.
it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    name: "Mellow Monk Top Leaf",
    tea_type: "Green",
    caffeine: "High",
    taste: "Strong",
    details: "This is our top-of-the-line honcha, or traditional green tea. Top Leaf™ Green Tea is specially pampered in its own separate corner of the tea orchard. Not only does this tea receive extra fertilizer (organic, of course) during the growing season, but at harvest time, the growers pick only the top layer of young tea leaves. The result is a distinctive, more subtle, gentler flavor. This tea is always first flush.",
    temp: "165",
    brew_time: "5",
  };
  ReactDOM.render(
    <BrowserRouter>
      <TeaClippingItem/>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});