'use strict';


module.exports = function textr(options) {

  /**
   * list of registred middlewares
   * @api public
   */
  var mws = [];

  /**
   * Options will be passed to either of the middlewares as second param.
   * @api private
   */
  options = options || {};

  /**
   * expose public interface of the textr
   *
   * @example
   *
   *      // functional style
   *      text = textr()
   *        // register plugins
   *        .use(quotes)
   *        .use(capitalize)
   *        .process(text)
   *
   *      // save transformer to reuse
   *      tf = textr()
   *        // register plugins
   *        .use(quotes, elipses, capitalize)
   *      ;
   *      return ['Hello', 'world'].map(tf);
   *
   * @constructor
   * @alias process
   * @return {object:{process:fn,use:fn}}
   * @return {fn:process}
   * @api public
   */
  function api() {
    return process.apply(null, arguments);
  }

  /**
   * Expose `process`, `use` and `mws` as properties
   * of the `api`
   */
  api.process = process;
  api.use = use;
  api.mws = mws;

  return api;

  /**
   * process given text by the middlewares
   * @param {string} text
   * @return {string} text
   * @api public
   */
  function process(text) {
    return mws.reduce(function(text, mw) {
      return mw(text, options);
    }, text);
  }

  /**
   * Register either middleware and array of middlewares
   * @param {...fn} ...middlewares
   * @return {api}
   * @api public
   */
  function use() {
    Array.prototype.push.apply(mws, arguments);
    return api;
  }

};
