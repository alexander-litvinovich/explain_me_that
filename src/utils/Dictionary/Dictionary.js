import { isDevelopment } from "utils/Helpers";

const DICTIONARY_CACHE_KEY = "cachedDict";
const LIST_CACHE_KEY = "cachedList";

class Dictionary {
  _catalogUrl = "/dicts/";

  _list = {};
  _dictionaries = {};

  _storeDict(dictionaryId, dict) {
    const dicts = JSON.parse(localStorage.getItem(DICTIONARY_CACHE_KEY)) || {};
    dicts[dictionaryId] = dict;
    localStorage.setItem(DICTIONARY_CACHE_KEY, JSON.stringify(dicts));
  }

  _getDict(dictionaryId) {
    return (
      JSON.parse(localStorage.getItem(DICTIONARY_CACHE_KEY))[dictionaryId] ||
      null
    );
  }

  _storeList(list) {
    localStorage.setItem(LIST_CACHE_KEY, JSON.stringify(list));
  }

  _getList() {
    return JSON.parse(localStorage.getItem(LIST_CACHE_KEY)) || null;
  }

  isListCached() {
    let cache = localStorage.getItem(LIST_CACHE_KEY);
    isDevelopment() && console.log("List is cached", cache);

    return !!cache;
  }

  isDictCached(dictionaryId) {
    isDevelopment() && console.log("DEBUG DICTCACHE: ");
    if(!localStorage.getItem(DICTIONARY_CACHE_KEY)) return false;

    let dictCache = JSON.parse(localStorage.getItem(DICTIONARY_CACHE_KEY))[dictionaryId];
    return !!dictCache;
  }

  async list(refetch) {
    isDevelopment() && console.log('Trying to get lists');

    if(Object.keys(this._list).length && !refetch){
      isDevelopment() && console.log('Taking lists from this');
      return this._list;
    }

    if(this.isListCached() && !refetch) {
      isDevelopment() && console.log('Taking lists from localstorage');
      this._list = this._getList();
      return this._list;
    }

    if (navigator.onLine) {
      isDevelopment() && console.log('Going to internet for lists');
      const response = await fetch(`${this._catalogUrl}index.json`);
      const list = await response.json();
      this._list = list.dictionaries;
      this._storeList(list.dictionaries);
      isDevelopment() && console.log(this._list);
    }

    return this._list;
  }

  async get(dictionaryId, refetch = false) {
    isDevelopment() && console.log('Trying to get dicts');

    if(this._dictionaries[dictionaryId] && !refetch){
      isDevelopment() && console.log("Taking from this");
      return this._dictionaries[dictionaryId];
    }

    isDevelopment() && console.log("TEST CACHE: ", this.isDictCached(dictionaryId));

    if(this.isDictCached(dictionaryId) && !refetch) {
      isDevelopment() && console.log("Taking from localstorage");
      this._dictionaries[dictionaryId] = this._getDict(dictionaryId);
      return this._dictionaries[dictionaryId];
    }

    if (navigator.onLine) {
      isDevelopment() && console.log('Going to internet');
      const response = await fetch(
        `${this._catalogUrl}${(await this.list())[dictionaryId].uri}`
      );
      const dict = await response.json();
      isDevelopment() && console.log("DICT LOADED HERE: ", dict);
      this._dictionaries[dictionaryId] = dict.words;
      this._storeDict(dictionaryId, dict.words);
      return this._dictionaries[dictionaryId];
    }

  }
}

export default Dictionary;
