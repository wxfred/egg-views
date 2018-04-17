'use strict';

exports.data = () => {
  return 'world';
};

exports.root = () => {
  console.log(this);
  return this.config.views.options.root;
};
