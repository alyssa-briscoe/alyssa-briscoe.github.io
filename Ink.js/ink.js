!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(
        ((t = "undefined" != typeof globalThis ? globalThis : t || self).inkjs =
          {})
      );
})(this, function (t) {
  "use strict";
  class e {
    constructor() {
      if (
        ((this._components = []),
        (this._componentsString = null),
        (this._isRelative = !1),
        "string" == typeof arguments[0])
      ) {
        let t = arguments[0];
        this.componentsString = t;
      } else if (
        arguments[0] instanceof e.Component &&
        arguments[1] instanceof e
      ) {
        let t = arguments[0],
          e = arguments[1];
        this._components.push(t),
          (this._components = this._components.concat(e._components));
      } else if (arguments[0] instanceof Array) {
        let t = arguments[0],
          e = !!arguments[1];
        (this._components = this._components.concat(t)), (this._isRelative = e);
      }
    }
    get isRelative() {
      return this._isRelative;
    }
    get componentCount() {
      return this._components.length;
    }
    get head() {
      return this._components.length > 0 ? this._components[0] : null;
    }
    get tail() {
      if (this._components.length >= 2) {
        let t = this._components.slice(1, this._components.length);
        return new e(t);
      }
      return e.self;
    }
    get length() {
      return this._components.length;
    }
    get lastComponent() {
      let t = this._components.length - 1;
      return t >= 0 ? this._components[t] : null;
    }
    get containsNamedComponent() {
      for (let t = 0, e = this._components.length; t < e; t++)
        if (!this._components[t].isIndex) return !0;
      return !1;
    }
    static get self() {
      let t = new e();
      return (t._isRelative = !0), t;
    }
    GetComponent(t) {
      return this._components[t];
    }
    PathByAppendingPath(t) {
      let n = new e(),
        i = 0;
      for (
        let e = 0;
        e < t._components.length && t._components[e].isParent;
        ++e
      )
        i++;
      for (let t = 0; t < this._components.length - i; ++t)
        n._components.push(this._components[t]);
      for (let e = i; e < t._components.length; ++e)
        n._components.push(t._components[e]);
      return n;
    }
    get componentsString() {
      return (
        null == this._componentsString &&
          ((this._componentsString = this._components.join(".")),
          this.isRelative &&
            (this._componentsString = "." + this._componentsString)),
        this._componentsString
      );
    }
    set componentsString(t) {
      if (
        ((this._components.length = 0),
        (this._componentsString = t),
        null == this._componentsString || "" == this._componentsString)
      )
        return;
      "." == this._componentsString[0] &&
        ((this._isRelative = !0),
        (this._componentsString = this._componentsString.substring(1)));
      let n = this._componentsString.split(".");
      for (let t of n)
        /^(\-|\+)?([0-9]+|Infinity)$/.test(t)
          ? this._components.push(new e.Component(parseInt(t)))
          : this._components.push(new e.Component(t));
    }
    toString() {
      return this.componentsString;
    }
    Equals(t) {
      if (null == t) return !1;
      if (t._components.length != this._components.length) return !1;
      if (t.isRelative != this.isRelative) return !1;
      for (let e = 0, n = t._components.length; e < n; e++)
        if (!t._components[e].Equals(this._components[e])) return !1;
      return !0;
    }
    PathByAppendingComponent(t) {
      let n = new e();
      return n._components.push(...this._components), n._components.push(t), n;
    }
  }
  var n, i, r, a;
  function s(t, e) {
    return t instanceof e ? c(t) : null;
  }
  function l(t, e) {
    if (t instanceof e) return c(t);
    throw new Error(`${t} is not of type ${e}`);
  }
  function o(t) {
    return t.hasValidName && t.name ? t : null;
  }
  function u(t) {
    return void 0 === t ? null : t;
  }
  function h(t) {
    return "object" == typeof t && "function" == typeof t.Equals;
  }
  function c(t, e) {
    return t;
  }
  (e.parentId = "^"),
    (function (t) {
      class e {
        constructor(t) {
          (this.index = -1),
            (this.name = null),
            "string" == typeof t ? (this.name = t) : (this.index = t);
        }
        get isIndex() {
          return this.index >= 0;
        }
        get isParent() {
          return this.name == t.parentId;
        }
        static ToParent() {
          return new e(t.parentId);
        }
        toString() {
          return this.isIndex ? this.index.toString() : this.name;
        }
        Equals(t) {
          return (
            null != t &&
            t.isIndex == this.isIndex &&
            (this.isIndex ? this.index == t.index : this.name == t.name)
          );
        }
      }
      t.Component = e;
    })(e || (e = {})),
    (function (t) {
      function e(t, e) {
        if (!t)
          throw (
            (void 0 !== e && console.warn(e),
            console.trace && console.trace(),
            new Error(""))
          );
      }
      (t.AssertType = function (t, n, i) {
        e(t instanceof n, i);
      }),
        (t.Assert = e);
    })(n || (n = {}));
  class d extends Error {}
  function p(t) {
    throw new d(t + " is null or undefined");
  }
  class m {
    constructor() {
      (this.parent = null), (this._debugMetadata = null), (this._path = null);
    }
    get debugMetadata() {
      return null === this._debugMetadata && this.parent
        ? this.parent.debugMetadata
        : this._debugMetadata;
    }
    set debugMetadata(t) {
      this._debugMetadata = t;
    }
    get ownDebugMetadata() {
      return this._debugMetadata;
    }
    DebugLineNumberOfPath(t) {
      if (null === t) return null;
      let e = this.rootContentContainer;
      if (e) {
        let n = e.ContentAtPath(t).obj;
        if (n) {
          let t = n.debugMetadata;
          if (null !== t) return t.startLineNumber;
        }
      }
      return null;
    }
    get path() {
      if (null == this._path)
        if (null == this.parent) this._path = new e();
        else {
          let t = [],
            n = this,
            i = s(n.parent, x);
          for (; null !== i; ) {
            let r = o(n);
            null != r && r.hasValidName
              ? t.unshift(new e.Component(r.name))
              : t.unshift(new e.Component(i.content.indexOf(n))),
              (n = i),
              (i = s(i.parent, x));
          }
          this._path = new e(t);
        }
      return this._path;
    }
    ResolvePath(t) {
      if (null === t) return p("path");
      if (t.isRelative) {
        let e = s(this, x);
        return (
          null === e &&
            (n.Assert(
              null !== this.parent,
              "Can't resolve relative path because we don't have a parent"
            ),
            (e = s(this.parent, x)),
            n.Assert(null !== e, "Expected parent to be a container"),
            n.Assert(t.GetComponent(0).isParent),
            (t = t.tail)),
          null === e ? p("nearestContainer") : e.ContentAtPath(t)
        );
      }
      {
        let e = this.rootContentContainer;
        return null === e ? p("contentContainer") : e.ContentAtPath(t);
      }
    }
    ConvertPathToRelative(t) {
      let n = this.path,
        i = Math.min(t.length, n.length),
        r = -1;
      for (let e = 0; e < i; ++e) {
        let i = n.GetComponent(e),
          a = t.GetComponent(e);
        if (!i.Equals(a)) break;
        r = e;
      }
      if (-1 == r) return t;
      let a = n.componentCount - 1 - r,
        s = [];
      for (let t = 0; t < a; ++t) s.push(e.Component.ToParent());
      for (let e = r + 1; e < t.componentCount; ++e) s.push(t.GetComponent(e));
      return new e(s, !0);
    }
    CompactPathString(t) {
      let e = null,
        n = null;
      if (t.isRelative)
        (n = t.componentsString),
          (e = this.path.PathByAppendingPath(t).componentsString);
      else {
        (n = this.ConvertPathToRelative(t).componentsString),
          (e = t.componentsString);
      }
      return n.length < e.length ? n : e;
    }
    get rootContentContainer() {
      let t = this;
      for (; t.parent; ) t = t.parent;
      return s(t, x);
    }
    Copy() {
      throw Error("Not Implemented: Doesn't support copying");
    }
    SetChild(t, e, n) {
      t[e] && (t[e] = null), (t[e] = n), t[e] && (t[e].parent = this);
    }
  }
  class f {
    constructor(t) {
      (t = void 0 !== t ? t.toString() : ""), (this.string = t);
    }
    get Length() {
      return this.string.length;
    }
    Append(t) {
      null !== t && (this.string += t);
    }
    AppendLine(t) {
      void 0 !== t && this.Append(t), (this.string += "\n");
    }
    AppendFormat(t, ...e) {
      this.string += t.replace(/{(\d+)}/g, (t, n) =>
        void 0 !== e[n] ? e[n] : t
      );
    }
    toString() {
      return this.string;
    }
  }
  class g {
    constructor() {
      if (
        ((this.originName = null),
        (this.itemName = null),
        void 0 !== arguments[1])
      ) {
        let t = arguments[0],
          e = arguments[1];
        (this.originName = t), (this.itemName = e);
      } else if (arguments[0]) {
        let t = arguments[0].toString().split(".");
        (this.originName = t[0]), (this.itemName = t[1]);
      }
    }
    static get Null() {
      return new g(null, null);
    }
    get isNull() {
      return null == this.originName && null == this.itemName;
    }
    get fullName() {
      return (
        (null !== this.originName ? this.originName : "?") + "." + this.itemName
      );
    }
    toString() {
      return this.fullName;
    }
    Equals(t) {
      if (t instanceof g) {
        let e = t;
        return e.itemName == this.itemName && e.originName == this.originName;
      }
      return !1;
    }
    copy() {
      return new g(this.originName, this.itemName);
    }
    serialized() {
      return JSON.stringify({
        originName: this.originName,
        itemName: this.itemName,
      });
    }
    static fromSerializedKey(t) {
      let e = JSON.parse(t);
      if (!g.isLikeInkListItem(e)) return g.Null;
      let n = e;
      return new g(n.originName, n.itemName);
    }
    static isLikeInkListItem(t) {
      return (
        "object" == typeof t &&
        !(!t.hasOwnProperty("originName") || !t.hasOwnProperty("itemName")) &&
        ("string" == typeof t.originName || null === typeof t.originName) &&
        ("string" == typeof t.itemName || null === typeof t.itemName)
      );
    }
  }
  class S extends Map {
    constructor() {
      if (
        (super(arguments[0] instanceof S ? arguments[0] : []),
        (this.origins = null),
        (this._originNames = []),
        arguments[0] instanceof S)
      ) {
        let t = arguments[0];
        (this._originNames = t.originNames),
          null !== t.origins && (this.origins = t.origins.slice());
      } else if ("string" == typeof arguments[0]) {
        let t = arguments[0],
          e = arguments[1];
        if ((this.SetInitialOriginName(t), null === e.listDefinitions))
          return p("originStory.listDefinitions");
        let n = e.listDefinitions.TryListGetDefinition(t, null);
        if (!n.exists)
          throw new Error(
            "InkList origin could not be found in story when constructing new list: " +
              t
          );
        if (null === n.result) return p("def.result");
        this.origins = [n.result];
      } else if (
        "object" == typeof arguments[0] &&
        arguments[0].hasOwnProperty("Key") &&
        arguments[0].hasOwnProperty("Value")
      ) {
        let t = arguments[0];
        this.Add(t.Key, t.Value);
      }
    }
    static FromString(t, e) {
      var n;
      let i =
        null === (n = e.listDefinitions) || void 0 === n
          ? void 0
          : n.FindSingleItemListWithName(t);
      if (i) return null === i.value ? p("listValue.value") : new S(i.value);
      throw new Error(
        "Could not find the InkListItem from the string '" +
          t +
          "' to create an InkList because it doesn't exist in the original list definition in ink."
      );
    }
    AddItem(t) {
      if (t instanceof g) {
        let e = t;
        if (null == e.originName) return void this.AddItem(e.itemName);
        if (null === this.origins) return p("this.origins");
        for (let t of this.origins)
          if (t.name == e.originName) {
            let n = t.TryGetValueForItem(e, 0);
            if (n.exists) return void this.Add(e, n.result);
            throw new Error(
              "Could not add the item " +
                e +
                " to this list because it doesn't exist in the original list definition in ink."
            );
          }
        throw new Error(
          "Failed to add item to list because the item was from a new list definition that wasn't previously known to this list. Only items from previously known lists can be used, so that the int value can be found."
        );
      }
      {
        let e = t,
          n = null;
        if (null === this.origins) return p("this.origins");
        for (let t of this.origins) {
          if (null === e) return p("itemName");
          if (t.ContainsItemWithName(e)) {
            if (null != n)
              throw new Error(
                "Could not add the item " +
                  e +
                  " to this list because it could come from either " +
                  t.name +
                  " or " +
                  n.name
              );
            n = t;
          }
        }
        if (null == n)
          throw new Error(
            "Could not add the item " +
              e +
              " to this list because it isn't known to any list definitions previously associated with this list."
          );
        let i = new g(n.name, e),
          r = n.ValueForItem(i);
        this.Add(i, r);
      }
    }
    ContainsItemNamed(t) {
      for (let [e] of this) {
        if (g.fromSerializedKey(e).itemName == t) return !0;
      }
      return !1;
    }
    ContainsKey(t) {
      return this.has(t.serialized());
    }
    Add(t, e) {
      let n = t.serialized();
      if (this.has(n))
        throw new Error("The Map already contains an entry for " + t);
      this.set(n, e);
    }
    Remove(t) {
      return this.delete(t.serialized());
    }
    get Count() {
      return this.size;
    }
    get originOfMaxItem() {
      if (null == this.origins) return null;
      let t = this.maxItem.Key.originName,
        e = null;
      return this.origins.every((n) => n.name != t || ((e = n), !1)), e;
    }
    get originNames() {
      if (this.Count > 0) {
        null == this._originNames && this.Count > 0
          ? (this._originNames = [])
          : (this._originNames || (this._originNames = []),
            (this._originNames.length = 0));
        for (let [t] of this) {
          let e = g.fromSerializedKey(t);
          if (null === e.originName) return p("item.originName");
          this._originNames.push(e.originName);
        }
      }
      return this._originNames;
    }
    SetInitialOriginName(t) {
      this._originNames = [t];
    }
    SetInitialOriginNames(t) {
      this._originNames = null == t ? null : t.slice();
    }
    get maxItem() {
      let t = { Key: g.Null, Value: 0 };
      for (let [e, n] of this) {
        let i = g.fromSerializedKey(e);
        (t.Key.isNull || n > t.Value) && (t = { Key: i, Value: n });
      }
      return t;
    }
    get minItem() {
      let t = { Key: g.Null, Value: 0 };
      for (let [e, n] of this) {
        let i = g.fromSerializedKey(e);
        (t.Key.isNull || n < t.Value) && (t = { Key: i, Value: n });
      }
      return t;
    }
    get inverse() {
      let t = new S();
      if (null != this.origins)
        for (let e of this.origins)
          for (let [n, i] of e.items) {
            let e = g.fromSerializedKey(n);
            this.ContainsKey(e) || t.Add(e, i);
          }
      return t;
    }
    get all() {
      let t = new S();
      if (null != this.origins)
        for (let e of this.origins)
          for (let [n, i] of e.items) {
            let e = g.fromSerializedKey(n);
            t.set(e.serialized(), i);
          }
      return t;
    }
    Union(t) {
      let e = new S(this);
      for (let [n, i] of t) e.set(n, i);
      return e;
    }
    Intersect(t) {
      let e = new S();
      for (let [n, i] of this) t.has(n) && e.set(n, i);
      return e;
    }
    Without(t) {
      let e = new S(this);
      for (let [n] of t) e.delete(n);
      return e;
    }
    Contains(t) {
      for (let [e] of t) if (!this.has(e)) return !1;
      return !0;
    }
    GreaterThan(t) {
      return (
        0 != this.Count &&
        (0 == t.Count || this.minItem.Value > t.maxItem.Value)
      );
    }
    GreaterThanOrEquals(t) {
      return (
        0 != this.Count &&
        (0 == t.Count ||
          (this.minItem.Value >= t.minItem.Value &&
            this.maxItem.Value >= t.maxItem.Value))
      );
    }
    LessThan(t) {
      return (
        0 != t.Count &&
        (0 == this.Count || this.maxItem.Value < t.minItem.Value)
      );
    }
    LessThanOrEquals(t) {
      return (
        0 != t.Count &&
        (0 == this.Count ||
          (this.maxItem.Value <= t.maxItem.Value &&
            this.minItem.Value <= t.minItem.Value))
      );
    }
    MaxAsList() {
      return this.Count > 0 ? new S(this.maxItem) : new S();
    }
    MinAsList() {
      return this.Count > 0 ? new S(this.minItem) : new S();
    }
    ListWithSubRange(t, e) {
      if (0 == this.Count) return new S();
      let n = this.orderedItems,
        i = 0,
        r = Number.MAX_SAFE_INTEGER;
      Number.isInteger(t)
        ? (i = t)
        : t instanceof S && t.Count > 0 && (i = t.minItem.Value),
        Number.isInteger(e)
          ? (r = e)
          : t instanceof S && t.Count > 0 && (r = e.maxItem.Value);
      let a = new S();
      a.SetInitialOriginNames(this.originNames);
      for (let t of n) t.Value >= i && t.Value <= r && a.Add(t.Key, t.Value);
      return a;
    }
    Equals(t) {
      if (t instanceof S == !1) return !1;
      if (t.Count != this.Count) return !1;
      for (let [e] of this) if (!t.has(e)) return !1;
      return !0;
    }
    get orderedItems() {
      let t = new Array();
      for (let [e, n] of this) {
        let i = g.fromSerializedKey(e);
        t.push({ Key: i, Value: n });
      }
      return (
        t.sort((t, e) =>
          null === t.Key.originName
            ? p("x.Key.originName")
            : null === e.Key.originName
            ? p("y.Key.originName")
            : t.Value == e.Value
            ? t.Key.originName.localeCompare(e.Key.originName)
            : t.Value < e.Value
            ? -1
            : t.Value > e.Value
            ? 1
            : 0
        ),
        t
      );
    }
    toString() {
      let t = this.orderedItems,
        e = new f();
      for (let n = 0; n < t.length; n++) {
        n > 0 && e.Append(", ");
        let i = t[n].Key;
        if (null === i.itemName) return p("item.itemName");
        e.Append(i.itemName);
      }
      return e.toString();
    }
    valueOf() {
      return NaN;
    }
  }
  class y extends Error {
    constructor(t) {
      super(t),
        (this.useEndLineNumber = !1),
        (this.message = t),
        (this.name = "StoryException");
    }
  }
  function C(t, e, n) {
    if (null === t) return { result: n, exists: !1 };
    let i = t.get(e);
    return void 0 === i ? { result: n, exists: !1 } : { result: i, exists: !0 };
  }
  class v extends m {
    static Create(t, n) {
      if (n) {
        if (n === i.Int && Number.isInteger(Number(t))) return new w(Number(t));
        if (n === i.Float && !isNaN(t)) return new T(Number(t));
      }
      return "boolean" == typeof t
        ? new _(Boolean(t))
        : "string" == typeof t
        ? new E(String(t))
        : Number.isInteger(Number(t))
        ? new w(Number(t))
        : isNaN(t)
        ? t instanceof e
          ? new P(l(t, e))
          : t instanceof S
          ? new N(l(t, S))
          : null
        : new T(Number(t));
    }
    Copy() {
      return l(v.Create(this), m);
    }
    BadCastException(t) {
      return new y(
        "Can't cast " +
          this.valueObject +
          " from " +
          this.valueType +
          " to " +
          t
      );
    }
  }
  class b extends v {
    constructor(t) {
      super(), (this.value = t);
    }
    get valueObject() {
      return this.value;
    }
    toString() {
      return null === this.value ? p("Value.value") : this.value.toString();
    }
  }
  class _ extends b {
    constructor(t) {
      super(t || !1);
    }
    get isTruthy() {
      return Boolean(this.value);
    }
    get valueType() {
      return i.Bool;
    }
    Cast(t) {
      if (null === this.value) return p("Value.value");
      if (t == this.valueType) return this;
      if (t == i.Int) return new w(this.value ? 1 : 0);
      if (t == i.Float) return new T(this.value ? 1 : 0);
      if (t == i.String) return new E(this.value ? "true" : "false");
      throw this.BadCastException(t);
    }
    toString() {
      return this.value ? "true" : "false";
    }
  }
  class w extends b {
    constructor(t) {
      super(t || 0);
    }
    get isTruthy() {
      return 0 != this.value;
    }
    get valueType() {
      return i.Int;
    }
    Cast(t) {
      if (null === this.value) return p("Value.value");
      if (t == this.valueType) return this;
      if (t == i.Bool) return new _(0 !== this.value);
      if (t == i.Float) return new T(this.value);
      if (t == i.String) return new E("" + this.value);
      throw this.BadCastException(t);
    }
  }
  class T extends b {
    constructor(t) {
      super(t || 0);
    }
    get isTruthy() {
      return 0 != this.value;
    }
    get valueType() {
      return i.Float;
    }
    Cast(t) {
      if (null === this.value) return p("Value.value");
      if (t == this.valueType) return this;
      if (t == i.Bool) return new _(0 !== this.value);
      if (t == i.Int) return new w(this.value);
      if (t == i.String) return new E("" + this.value);
      throw this.BadCastException(t);
    }
  }
  class E extends b {
    constructor(t) {
      if (
        (super(t || ""),
        (this._isNewline = "\n" == this.value),
        (this._isInlineWhitespace = !0),
        null === this.value)
      )
        return p("Value.value");
      this.value.length > 0 &&
        this.value
          .split("")
          .every(
            (t) =>
              " " == t || "\t" == t || ((this._isInlineWhitespace = !1), !1)
          );
    }
    get valueType() {
      return i.String;
    }
    get isTruthy() {
      return null === this.value ? p("Value.value") : this.value.length > 0;
    }
    get isNewline() {
      return this._isNewline;
    }
    get isInlineWhitespace() {
      return this._isInlineWhitespace;
    }
    get isNonWhitespace() {
      return !this.isNewline && !this.isInlineWhitespace;
    }
    Cast(t) {
      if (t == this.valueType) return this;
      if (t == i.Int) {
        let e = (function (t, e = 0) {
          let n = parseInt(t);
          return Number.isNaN(n)
            ? { result: e, exists: !1 }
            : { result: n, exists: !0 };
        })(this.value);
        if (e.exists) return new w(e.result);
        throw this.BadCastException(t);
      }
      if (t == i.Float) {
        let e = (function (t, e = 0) {
          let n = parseFloat(t);
          return Number.isNaN(n)
            ? { result: e, exists: !1 }
            : { result: n, exists: !0 };
        })(this.value);
        if (e.exists) return new T(e.result);
        throw this.BadCastException(t);
      }
      throw this.BadCastException(t);
    }
  }
  class P extends b {
    constructor(t) {
      super(t);
    }
    get valueType() {
      return i.DivertTarget;
    }
    get targetPath() {
      return null === this.value ? p("Value.value") : this.value;
    }
    set targetPath(t) {
      this.value = t;
    }
    get isTruthy() {
      throw new Error(
        "Shouldn't be checking the truthiness of a divert target"
      );
    }
    Cast(t) {
      if (t == this.valueType) return this;
      throw this.BadCastException(t);
    }
    toString() {
      return "DivertTargetValue(" + this.targetPath + ")";
    }
  }
  class O extends b {
    constructor(t, e = -1) {
      super(t), (this._contextIndex = e);
    }
    get contextIndex() {
      return this._contextIndex;
    }
    set contextIndex(t) {
      this._contextIndex = t;
    }
    get variableName() {
      return null === this.value ? p("Value.value") : this.value;
    }
    set variableName(t) {
      this.value = t;
    }
    get valueType() {
      return i.VariablePointer;
    }
    get isTruthy() {
      throw new Error(
        "Shouldn't be checking the truthiness of a variable pointer"
      );
    }
    Cast(t) {
      if (t == this.valueType) return this;
      throw this.BadCastException(t);
    }
    toString() {
      return "VariablePointerValue(" + this.variableName + ")";
    }
    Copy() {
      return new O(this.variableName, this.contextIndex);
    }
  }
  class N extends b {
    get isTruthy() {
      return null === this.value ? p("this.value") : this.value.Count > 0;
    }
    get valueType() {
      return i.List;
    }
    Cast(t) {
      if (null === this.value) return p("Value.value");
      if (t == i.Int) {
        let t = this.value.maxItem;
        return t.Key.isNull ? new w(0) : new w(t.Value);
      }
      if (t == i.Float) {
        let t = this.value.maxItem;
        return t.Key.isNull ? new T(0) : new T(t.Value);
      }
      if (t == i.String) {
        let t = this.value.maxItem;
        return t.Key.isNull ? new E("") : new E(t.Key.toString());
      }
      if (t == this.valueType) return this;
      throw this.BadCastException(t);
    }
    constructor(t, e) {
      super(null),
        t || e
          ? t instanceof S
            ? (this.value = new S(t))
            : t instanceof g &&
              "number" == typeof e &&
              (this.value = new S({ Key: t, Value: e }))
          : (this.value = new S());
    }
    static RetainListOriginsForAssignment(t, e) {
      let n = s(t, N),
        i = s(e, N);
      return i && null === i.value
        ? p("newList.value")
        : n && null === n.value
        ? p("oldList.value")
        : void (
            n &&
            i &&
            0 == i.value.Count &&
            i.value.SetInitialOriginNames(n.value.originNames)
          );
    }
  }
  !(function (t) {
    (t[(t.Bool = -1)] = "Bool"),
      (t[(t.Int = 0)] = "Int"),
      (t[(t.Float = 1)] = "Float"),
      (t[(t.List = 2)] = "List"),
      (t[(t.String = 3)] = "String"),
      (t[(t.DivertTarget = 4)] = "DivertTarget"),
      (t[(t.VariablePointer = 5)] = "VariablePointer");
  })(i || (i = {}));
  class A {
    constructor() {
      (this.obj = null), (this.approximate = !1);
    }
    get correctObj() {
      return this.approximate ? null : this.obj;
    }
    get container() {
      return this.obj instanceof x ? this.obj : null;
    }
    copy() {
      let t = new A();
      return (t.obj = this.obj), (t.approximate = this.approximate), t;
    }
  }
  class x extends m {
    constructor() {
      super(...arguments),
        (this.name = ""),
        (this._content = []),
        (this.namedContent = new Map()),
        (this.visitsShouldBeCounted = !1),
        (this.turnIndexShouldBeCounted = !1),
        (this.countingAtStartOnly = !1),
        (this._pathToFirstLeafContent = null);
    }
    get hasValidName() {
      return null != this.name && this.name.length > 0;
    }
    get content() {
      return this._content;
    }
    set content(t) {
      this.AddContent(t);
    }
    get namedOnlyContent() {
      let t = new Map();
      for (let [e, n] of this.namedContent) {
        let i = l(n, m);
        t.set(e, i);
      }
      for (let e of this.content) {
        let n = o(e);
        null != n && n.hasValidName && t.delete(n.name);
      }
      return 0 == t.size && (t = null), t;
    }
    set namedOnlyContent(t) {
      let e = this.namedOnlyContent;
      if (null != e) for (let [t] of e) this.namedContent.delete(t);
      if (null != t)
        for (let [, e] of t) {
          let t = o(e);
          null != t && this.AddToNamedContentOnly(t);
        }
    }
    get countFlags() {
      let t = 0;
      return (
        this.visitsShouldBeCounted && (t |= x.CountFlags.Visits),
        this.turnIndexShouldBeCounted && (t |= x.CountFlags.Turns),
        this.countingAtStartOnly && (t |= x.CountFlags.CountStartOnly),
        t == x.CountFlags.CountStartOnly && (t = 0),
        t
      );
    }
    set countFlags(t) {
      let e = t;
      (e & x.CountFlags.Visits) > 0 && (this.visitsShouldBeCounted = !0),
        (e & x.CountFlags.Turns) > 0 && (this.turnIndexShouldBeCounted = !0),
        (e & x.CountFlags.CountStartOnly) > 0 &&
          (this.countingAtStartOnly = !0);
    }
    get pathToFirstLeafContent() {
      return (
        null == this._pathToFirstLeafContent &&
          (this._pathToFirstLeafContent = this.path.PathByAppendingPath(
            this.internalPathToFirstLeafContent
          )),
        this._pathToFirstLeafContent
      );
    }
    get internalPathToFirstLeafContent() {
      let t = [],
        n = this;
      for (; n instanceof x; )
        n.content.length > 0 &&
          (t.push(new e.Component(0)), (n = n.content[0]));
      return new e(t);
    }
    AddContent(t) {
      if (t instanceof Array) {
        let e = t;
        for (let t of e) this.AddContent(t);
      } else {
        let e = t;
        if ((this._content.push(e), e.parent))
          throw new Error("content is already in " + e.parent);
        (e.parent = this), this.TryAddNamedContent(e);
      }
    }
    TryAddNamedContent(t) {
      let e = o(t);
      null != e && e.hasValidName && this.AddToNamedContentOnly(e);
    }
    AddToNamedContentOnly(t) {
      n.AssertType(t, m, "Can only add Runtime.Objects to a Runtime.Container"),
        (l(t, m).parent = this),
        this.namedContent.set(t.name, t);
    }
    ContentAtPath(t, e = 0, n = -1) {
      -1 == n && (n = t.length);
      let i = new A();
      i.approximate = !1;
      let r = this,
        a = this;
      for (let l = e; l < n; ++l) {
        let e = t.GetComponent(l);
        if (null == r) {
          i.approximate = !0;
          break;
        }
        let n = r.ContentWithPathComponent(e);
        if (null == n) {
          i.approximate = !0;
          break;
        }
        (a = n), (r = s(n, x));
      }
      return (i.obj = a), i;
    }
    InsertContent(t, e) {
      if (((this.content[e] = t), t.parent))
        throw new Error("content is already in " + t.parent);
      (t.parent = this), this.TryAddNamedContent(t);
    }
    AddContentsOfContainer(t) {
      this.content = this.content.concat(t.content);
      for (let e of t.content) (e.parent = this), this.TryAddNamedContent(e);
    }
    ContentWithPathComponent(t) {
      if (t.isIndex)
        return t.index >= 0 && t.index < this.content.length
          ? this.content[t.index]
          : null;
      if (t.isParent) return this.parent;
      {
        if (null === t.name) return p("component.name");
        let e = C(this.namedContent, t.name, null);
        return e.exists ? l(e.result, m) : null;
      }
    }
    BuildStringOfHierarchy() {
      let t;
      if (0 == arguments.length)
        return (
          (t = new f()), this.BuildStringOfHierarchy(t, 0, null), t.toString()
        );
      t = arguments[0];
      let e = arguments[1],
        i = arguments[2];
      function r() {
        for (let n = 0; n < 4 * e; ++n) t.Append(" ");
      }
      r(),
        t.Append("["),
        this.hasValidName && t.AppendFormat(" ({0})", this.name),
        this == i && t.Append("  <---"),
        t.AppendLine(),
        e++;
      for (let n = 0; n < this.content.length; ++n) {
        let a = this.content[n];
        if (a instanceof x) {
          a.BuildStringOfHierarchy(t, e, i);
        } else
          r(),
            a instanceof E
              ? (t.Append('"'),
                t.Append(a.toString().replace("\n", "\\n")),
                t.Append('"'))
              : t.Append(a.toString());
        n != this.content.length - 1 && t.Append(","),
          a instanceof x || a != i || t.Append("  <---"),
          t.AppendLine();
      }
      let a = new Map();
      for (let [t, e] of this.namedContent)
        this.content.indexOf(l(e, m)) >= 0 || a.set(t, e);
      if (a.size > 0) {
        r(), t.AppendLine("-- named: --");
        for (let [, r] of a) {
          n.AssertType(r, x, "Can only print out named Containers"),
            r.BuildStringOfHierarchy(t, e, i),
            t.AppendLine();
        }
      }
      e--, r(), t.Append("]");
    }
  }
  !(function (t) {
    var e;
    ((e = t.CountFlags || (t.CountFlags = {}))[(e.Visits = 1)] = "Visits"),
      (e[(e.Turns = 2)] = "Turns"),
      (e[(e.CountStartOnly = 4)] = "CountStartOnly");
  })(x || (x = {}));
  class I extends m {
    toString() {
      return "Glue";
    }
  }
  class k extends m {
    constructor(t = k.CommandType.NotSet) {
      super(), (this._commandType = t);
    }
    get commandType() {
      return this._commandType;
    }
    Copy() {
      return new k(this.commandType);
    }
    static EvalStart() {
      return new k(k.CommandType.EvalStart);
    }
    static EvalOutput() {
      return new k(k.CommandType.EvalOutput);
    }
    static EvalEnd() {
      return new k(k.CommandType.EvalEnd);
    }
    static Duplicate() {
      return new k(k.CommandType.Duplicate);
    }
    static PopEvaluatedValue() {
      return new k(k.CommandType.PopEvaluatedValue);
    }
    static PopFunction() {
      return new k(k.CommandType.PopFunction);
    }
    static PopTunnel() {
      return new k(k.CommandType.PopTunnel);
    }
    static BeginString() {
      return new k(k.CommandType.BeginString);
    }
    static EndString() {
      return new k(k.CommandType.EndString);
    }
    static NoOp() {
      return new k(k.CommandType.NoOp);
    }
    static ChoiceCount() {
      return new k(k.CommandType.ChoiceCount);
    }
    static Turns() {
      return new k(k.CommandType.Turns);
    }
    static TurnsSince() {
      return new k(k.CommandType.TurnsSince);
    }
    static ReadCount() {
      return new k(k.CommandType.ReadCount);
    }
    static Random() {
      return new k(k.CommandType.Random);
    }
    static SeedRandom() {
      return new k(k.CommandType.SeedRandom);
    }
    static VisitIndex() {
      return new k(k.CommandType.VisitIndex);
    }
    static SequenceShuffleIndex() {
      return new k(k.CommandType.SequenceShuffleIndex);
    }
    static StartThread() {
      return new k(k.CommandType.StartThread);
    }
    static Done() {
      return new k(k.CommandType.Done);
    }
    static End() {
      return new k(k.CommandType.End);
    }
    static ListFromInt() {
      return new k(k.CommandType.ListFromInt);
    }
    static ListRange() {
      return new k(k.CommandType.ListRange);
    }
    static ListRandom() {
      return new k(k.CommandType.ListRandom);
    }
    toString() {
      return this.commandType.toString();
    }
  }
  !(function (t) {
    var e;
    ((e = t.CommandType || (t.CommandType = {}))[(e.NotSet = -1)] = "NotSet"),
      (e[(e.EvalStart = 0)] = "EvalStart"),
      (e[(e.EvalOutput = 1)] = "EvalOutput"),
      (e[(e.EvalEnd = 2)] = "EvalEnd"),
      (e[(e.Duplicate = 3)] = "Duplicate"),
      (e[(e.PopEvaluatedValue = 4)] = "PopEvaluatedValue"),
      (e[(e.PopFunction = 5)] = "PopFunction"),
      (e[(e.PopTunnel = 6)] = "PopTunnel"),
      (e[(e.BeginString = 7)] = "BeginString"),
      (e[(e.EndString = 8)] = "EndString"),
      (e[(e.NoOp = 9)] = "NoOp"),
      (e[(e.ChoiceCount = 10)] = "ChoiceCount"),
      (e[(e.Turns = 11)] = "Turns"),
      (e[(e.TurnsSince = 12)] = "TurnsSince"),
      (e[(e.Random = 13)] = "Random"),
      (e[(e.SeedRandom = 14)] = "SeedRandom"),
      (e[(e.VisitIndex = 15)] = "VisitIndex"),
      (e[(e.SequenceShuffleIndex = 16)] = "SequenceShuffleIndex"),
      (e[(e.StartThread = 17)] = "StartThread"),
      (e[(e.Done = 18)] = "Done"),
      (e[(e.End = 19)] = "End"),
      (e[(e.ListFromInt = 20)] = "ListFromInt"),
      (e[(e.ListRange = 21)] = "ListRange"),
      (e[(e.ListRandom = 22)] = "ListRandom"),
      (e[(e.ReadCount = 23)] = "ReadCount"),
      (e[(e.TOTAL_VALUES = 24)] = "TOTAL_VALUES");
  })(k || (k = {})),
    (function (t) {
      (t[(t.Tunnel = 0)] = "Tunnel"),
        (t[(t.Function = 1)] = "Function"),
        (t[(t.FunctionEvaluationFromGame = 2)] = "FunctionEvaluationFromGame");
    })(r || (r = {}));
  class F {
    constructor() {
      (this.container = null),
        (this.index = -1),
        2 === arguments.length &&
          ((this.container = arguments[0]), (this.index = arguments[1]));
    }
    Resolve() {
      return this.index < 0
        ? this.container
        : null == this.container
        ? null
        : 0 == this.container.content.length
        ? this.container
        : this.index >= this.container.content.length
        ? null
        : this.container.content[this.index];
    }
    get isNull() {
      return null == this.container;
    }
    get path() {
      return this.isNull
        ? null
        : this.index >= 0
        ? this.container.path.PathByAppendingComponent(
            new e.Component(this.index)
          )
        : this.container.path;
    }
    toString() {
      return this.container
        ? "Ink Pointer -> " +
            this.container.path.toString() +
            " -- index " +
            this.index
        : "Ink Pointer (null)";
    }
    copy() {
      return new F(this.container, this.index);
    }
    static StartOf(t) {
      return new F(t, 0);
    }
    static get Null() {
      return new F(null, -1);
    }
  }
  class W extends m {
    constructor(t) {
      super(),
        (this._targetPath = null),
        (this._targetPointer = F.Null),
        (this.variableDivertName = null),
        (this.pushesToStack = !1),
        (this.stackPushType = 0),
        (this.isExternal = !1),
        (this.externalArgs = 0),
        (this.isConditional = !1),
        (this.pushesToStack = !1),
        void 0 !== t && ((this.pushesToStack = !0), (this.stackPushType = t));
    }
    get targetPath() {
      if (null != this._targetPath && this._targetPath.isRelative) {
        let t = this.targetPointer.Resolve();
        t && (this._targetPath = t.path);
      }
      return this._targetPath;
    }
    set targetPath(t) {
      (this._targetPath = t), (this._targetPointer = F.Null);
    }
    get targetPointer() {
      if (this._targetPointer.isNull) {
        let t = this.ResolvePath(this._targetPath).obj;
        if (null === this._targetPath) return p("this._targetPath");
        if (null === this._targetPath.lastComponent)
          return p("this._targetPath.lastComponent");
        if (this._targetPath.lastComponent.isIndex) {
          if (null === t) return p("targetObj");
          (this._targetPointer.container =
            t.parent instanceof x ? t.parent : null),
            (this._targetPointer.index = this._targetPath.lastComponent.index);
        } else this._targetPointer = F.StartOf(t instanceof x ? t : null);
      }
      return this._targetPointer.copy();
    }
    get targetPathString() {
      return null == this.targetPath
        ? null
        : this.CompactPathString(this.targetPath);
    }
    set targetPathString(t) {
      this.targetPath = null == t ? null : new e(t);
    }
    get hasVariableTarget() {
      return null != this.variableDivertName;
    }
    Equals(t) {
      let e = t;
      return (
        e instanceof W &&
        this.hasVariableTarget == e.hasVariableTarget &&
        (this.hasVariableTarget
          ? this.variableDivertName == e.variableDivertName
          : null === this.targetPath
          ? p("this.targetPath")
          : this.targetPath.Equals(e.targetPath))
      );
    }
    toString() {
      if (this.hasVariableTarget)
        return "Divert(variable: " + this.variableDivertName + ")";
      if (null == this.targetPath) return "Divert(null)";
      {
        let t = new f(),
          e = this.targetPath.toString();
        return (
          t.Append("Divert"),
          this.isConditional && t.Append("?"),
          this.pushesToStack &&
            (this.stackPushType == r.Function
              ? t.Append(" function")
              : t.Append(" tunnel")),
          t.Append(" -> "),
          t.Append(this.targetPathString),
          t.Append(" ("),
          t.Append(e),
          t.Append(")"),
          t.toString()
        );
      }
    }
  }
  class V extends m {
    constructor(t = !0) {
      super(),
        (this._pathOnChoice = null),
        (this.hasCondition = !1),
        (this.hasStartContent = !1),
        (this.hasChoiceOnlyContent = !1),
        (this.isInvisibleDefault = !1),
        (this.onceOnly = !0),
        (this.onceOnly = t);
    }
    get pathOnChoice() {
      if (null != this._pathOnChoice && this._pathOnChoice.isRelative) {
        let t = this.choiceTarget;
        t && (this._pathOnChoice = t.path);
      }
      return this._pathOnChoice;
    }
    set pathOnChoice(t) {
      this._pathOnChoice = t;
    }
    get choiceTarget() {
      return null === this._pathOnChoice
        ? p("ChoicePoint._pathOnChoice")
        : this.ResolvePath(this._pathOnChoice).container;
    }
    get pathStringOnChoice() {
      return null === this.pathOnChoice
        ? p("ChoicePoint.pathOnChoice")
        : this.CompactPathString(this.pathOnChoice);
    }
    set pathStringOnChoice(t) {
      this.pathOnChoice = new e(t);
    }
    get flags() {
      let t = 0;
      return (
        this.hasCondition && (t |= 1),
        this.hasStartContent && (t |= 2),
        this.hasChoiceOnlyContent && (t |= 4),
        this.isInvisibleDefault && (t |= 8),
        this.onceOnly && (t |= 16),
        t
      );
    }
    set flags(t) {
      (this.hasCondition = (1 & t) > 0),
        (this.hasStartContent = (2 & t) > 0),
        (this.hasChoiceOnlyContent = (4 & t) > 0),
        (this.isInvisibleDefault = (8 & t) > 0),
        (this.onceOnly = (16 & t) > 0);
    }
    toString() {
      if (null === this.pathOnChoice) return p("ChoicePoint.pathOnChoice");
      return "Choice: -> " + this.pathOnChoice.toString();
    }
  }
  class L extends m {
    constructor(t = null) {
      super(), (this.pathForCount = null), (this.name = t);
    }
    get containerForCount() {
      return null === this.pathForCount
        ? null
        : this.ResolvePath(this.pathForCount).container;
    }
    get pathStringForCount() {
      return null === this.pathForCount
        ? null
        : this.CompactPathString(this.pathForCount);
    }
    set pathStringForCount(t) {
      this.pathForCount = null === t ? null : new e(t);
    }
    toString() {
      if (null != this.name) return "var(" + this.name + ")";
      return "read_count(" + this.pathStringForCount + ")";
    }
  }
  class R extends m {
    constructor(t, e) {
      super(),
        (this.variableName = t || null),
        (this.isNewDeclaration = !!e),
        (this.isGlobal = !1);
    }
    toString() {
      return "VarAssign to " + this.variableName;
    }
  }
  class j extends m {}
  class D extends m {
    constructor() {
      if (
        (super(),
        (this._name = null),
        (this._numberOfParameters = 0),
        (this._prototype = null),
        (this._isPrototype = !1),
        (this._operationFuncs = null),
        0 === arguments.length)
      )
        D.GenerateNativeFunctionsIfNecessary();
      else if (1 === arguments.length) {
        let t = arguments[0];
        D.GenerateNativeFunctionsIfNecessary(), (this.name = t);
      } else if (2 === arguments.length) {
        let t = arguments[0],
          e = arguments[1];
        (this._isPrototype = !0),
          (this.name = t),
          (this.numberOfParameters = e);
      }
    }
    static CallWithName(t) {
      return new D(t);
    }
    static CallExistsWithName(t) {
      return (
        this.GenerateNativeFunctionsIfNecessary(), this._nativeFunctions.get(t)
      );
    }
    get name() {
      return null === this._name ? p("NativeFunctionCall._name") : this._name;
    }
    set name(t) {
      (this._name = t),
        this._isPrototype ||
          (null === D._nativeFunctions
            ? p("NativeFunctionCall._nativeFunctions")
            : (this._prototype = D._nativeFunctions.get(this._name) || null));
    }
    get numberOfParameters() {
      return this._prototype
        ? this._prototype.numberOfParameters
        : this._numberOfParameters;
    }
    set numberOfParameters(t) {
      this._numberOfParameters = t;
    }
    Call(t) {
      if (this._prototype) return this._prototype.Call(t);
      if (this.numberOfParameters != t.length)
        throw new Error("Unexpected number of parameters");
      let e = !1;
      for (let n of t) {
        if (n instanceof j)
          throw new y(
            'Attempting to perform operation on a void value. Did you forget to "return" a value from a function you called here?'
          );
        n instanceof N && (e = !0);
      }
      if (2 == t.length && e) return this.CallBinaryListOperation(t);
      let n = this.CoerceValuesToSingleType(t),
        r = n[0].valueType;
      return r == i.Int ||
        r == i.Float ||
        r == i.String ||
        r == i.DivertTarget ||
        r == i.List
        ? this.CallType(n)
        : null;
    }
    CallType(t) {
      let e = l(t[0], b),
        n = e.valueType,
        r = e,
        a = t.length;
      if (2 == a || 1 == a) {
        if (null === this._operationFuncs)
          return p("NativeFunctionCall._operationFuncs");
        let s = this._operationFuncs.get(n);
        if (!s) {
          const t = i[n];
          throw new y("Cannot perform operation " + this.name + " on " + t);
        }
        if (2 == a) {
          let e = l(t[1], b),
            n = s;
          if (null === r.value || null === e.value)
            return p("NativeFunctionCall.Call BinaryOp values");
          let i = n(r.value, e.value);
          return b.Create(i);
        }
        {
          let t = s;
          if (null === r.value)
            return p("NativeFunctionCall.Call UnaryOp value");
          let n = t(r.value);
          return this.name === D.Int
            ? b.Create(n, i.Int)
            : this.name === D.Float
            ? b.Create(n, i.Float)
            : b.Create(n, e.valueType);
        }
      }
      throw new Error(
        "Unexpected number of parameters to NativeFunctionCall: " + t.length
      );
    }
    CallBinaryListOperation(t) {
      if (
        ("+" == this.name || "-" == this.name) &&
        t[0] instanceof N &&
        t[1] instanceof w
      )
        return this.CallListIncrementOperation(t);
      let e = l(t[0], b),
        n = l(t[1], b);
      if (
        !(
          ("&&" != this.name && "||" != this.name) ||
          (e.valueType == i.List && n.valueType == i.List)
        )
      ) {
        if (null === this._operationFuncs)
          return p("NativeFunctionCall._operationFuncs");
        let t = this._operationFuncs.get(i.Int);
        if (null === t)
          return p("NativeFunctionCall.CallBinaryListOperation op");
        let r = (function (t) {
          if ("boolean" == typeof t) return t;
          throw new Error(t + " is not a boolean");
        })(t(e.isTruthy ? 1 : 0, n.isTruthy ? 1 : 0));
        return new _(r);
      }
      if (e.valueType == i.List && n.valueType == i.List)
        return this.CallType([e, n]);
      throw new y(
        "Can not call use " +
          this.name +
          " operation on " +
          i[e.valueType] +
          " and " +
          i[n.valueType]
      );
    }
    CallListIncrementOperation(t) {
      let e = l(t[0], N),
        n = l(t[1], w),
        r = new S();
      if (null === e.value)
        return p("NativeFunctionCall.CallListIncrementOperation listVal.value");
      for (let [t, a] of e.value) {
        let s = g.fromSerializedKey(t);
        if (null === this._operationFuncs)
          return p("NativeFunctionCall._operationFuncs");
        let l = this._operationFuncs.get(i.Int);
        if (null === n.value)
          return p(
            "NativeFunctionCall.CallListIncrementOperation intVal.value"
          );
        let o = l(a, n.value),
          u = null;
        if (null === e.value.origins)
          return p(
            "NativeFunctionCall.CallListIncrementOperation listVal.value.origins"
          );
        for (let t of e.value.origins)
          if (t.name == s.originName) {
            u = t;
            break;
          }
        if (null != u) {
          let t = u.TryGetItemWithValue(o, g.Null);
          t.exists && r.Add(t.result, o);
        }
      }
      return new N(r);
    }
    CoerceValuesToSingleType(t) {
      let e = i.Int,
        n = null;
      for (let r of t) {
        let t = l(r, b);
        t.valueType > e && (e = t.valueType),
          t.valueType == i.List && (n = s(t, N));
      }
      let r = [];
      if (i[e] == i[i.List])
        for (let e of t) {
          let t = l(e, b);
          if (t.valueType == i.List) r.push(t);
          else {
            if (t.valueType != i.Int) {
              const e = i[t.valueType];
              throw new y(
                "Cannot mix Lists and " + e + " values in this operation"
              );
            }
            {
              let e = parseInt(t.valueObject);
              if (((n = l(n, N)), null === n.value))
                return p(
                  "NativeFunctionCall.CoerceValuesToSingleType specialCaseList.value"
                );
              let i = n.value.originOfMaxItem;
              if (null === i)
                return p("NativeFunctionCall.CoerceValuesToSingleType list");
              let a = i.TryGetItemWithValue(e, g.Null);
              if (!a.exists)
                throw new y(
                  "Could not find List item with the value " +
                    e +
                    " in " +
                    i.name
                );
              {
                let t = new N(a.result, e);
                r.push(t);
              }
            }
          }
        }
      else
        for (let n of t) {
          let t = l(n, b).Cast(e);
          r.push(t);
        }
      return r;
    }
    static Identity(t) {
      return t;
    }
    static GenerateNativeFunctionsIfNecessary() {
      if (null == this._nativeFunctions) {
        (this._nativeFunctions = new Map()),
          this.AddIntBinaryOp(this.Add, (t, e) => t + e),
          this.AddIntBinaryOp(this.Subtract, (t, e) => t - e),
          this.AddIntBinaryOp(this.Multiply, (t, e) => t * e),
          this.AddIntBinaryOp(this.Divide, (t, e) => Math.floor(t / e)),
          this.AddIntBinaryOp(this.Mod, (t, e) => t % e),
          this.AddIntUnaryOp(this.Negate, (t) => -t),
          this.AddIntBinaryOp(this.Equal, (t, e) => t == e),
          this.AddIntBinaryOp(this.Greater, (t, e) => t > e),
          this.AddIntBinaryOp(this.Less, (t, e) => t < e),
          this.AddIntBinaryOp(this.GreaterThanOrEquals, (t, e) => t >= e),
          this.AddIntBinaryOp(this.LessThanOrEquals, (t, e) => t <= e),
          this.AddIntBinaryOp(this.NotEquals, (t, e) => t != e),
          this.AddIntUnaryOp(this.Not, (t) => 0 == t),
          this.AddIntBinaryOp(this.And, (t, e) => 0 != t && 0 != e),
          this.AddIntBinaryOp(this.Or, (t, e) => 0 != t || 0 != e),
          this.AddIntBinaryOp(this.Max, (t, e) => Math.max(t, e)),
          this.AddIntBinaryOp(this.Min, (t, e) => Math.min(t, e)),
          this.AddIntBinaryOp(this.Pow, (t, e) => Math.pow(t, e)),
          this.AddIntUnaryOp(this.Floor, D.Identity),
          this.AddIntUnaryOp(this.Ceiling, D.Identity),
          this.AddIntUnaryOp(this.Int, D.Identity),
          this.AddIntUnaryOp(this.Float, (t) => t),
          this.AddFloatBinaryOp(this.Add, (t, e) => t + e),
          this.AddFloatBinaryOp(this.Subtract, (t, e) => t - e),
          this.AddFloatBinaryOp(this.Multiply, (t, e) => t * e),
          this.AddFloatBinaryOp(this.Divide, (t, e) => t / e),
          this.AddFloatBinaryOp(this.Mod, (t, e) => t % e),
          this.AddFloatUnaryOp(this.Negate, (t) => -t),
          this.AddFloatBinaryOp(this.Equal, (t, e) => t == e),
          this.AddFloatBinaryOp(this.Greater, (t, e) => t > e),
          this.AddFloatBinaryOp(this.Less, (t, e) => t < e),
          this.AddFloatBinaryOp(this.GreaterThanOrEquals, (t, e) => t >= e),
          this.AddFloatBinaryOp(this.LessThanOrEquals, (t, e) => t <= e),
          this.AddFloatBinaryOp(this.NotEquals, (t, e) => t != e),
          this.AddFloatUnaryOp(this.Not, (t) => 0 == t),
          this.AddFloatBinaryOp(this.And, (t, e) => 0 != t && 0 != e),
          this.AddFloatBinaryOp(this.Or, (t, e) => 0 != t || 0 != e),
          this.AddFloatBinaryOp(this.Max, (t, e) => Math.max(t, e)),
          this.AddFloatBinaryOp(this.Min, (t, e) => Math.min(t, e)),
          this.AddFloatBinaryOp(this.Pow, (t, e) => Math.pow(t, e)),
          this.AddFloatUnaryOp(this.Floor, (t) => Math.floor(t)),
          this.AddFloatUnaryOp(this.Ceiling, (t) => Math.ceil(t)),
          this.AddFloatUnaryOp(this.Int, (t) => Math.floor(t)),
          this.AddFloatUnaryOp(this.Float, D.Identity),
          this.AddStringBinaryOp(this.Add, (t, e) => t + e),
          this.AddStringBinaryOp(this.Equal, (t, e) => t === e),
          this.AddStringBinaryOp(this.NotEquals, (t, e) => !(t === e)),
          this.AddStringBinaryOp(this.Has, (t, e) => t.includes(e)),
          this.AddStringBinaryOp(this.Hasnt, (t, e) => !t.includes(e)),
          this.AddListBinaryOp(this.Add, (t, e) => t.Union(e)),
          this.AddListBinaryOp(this.Subtract, (t, e) => t.Without(e)),
          this.AddListBinaryOp(this.Has, (t, e) => t.Contains(e)),
          this.AddListBinaryOp(this.Hasnt, (t, e) => !t.Contains(e)),
          this.AddListBinaryOp(this.Intersect, (t, e) => t.Intersect(e)),
          this.AddListBinaryOp(this.Equal, (t, e) => t.Equals(e)),
          this.AddListBinaryOp(this.Greater, (t, e) => t.GreaterThan(e)),
          this.AddListBinaryOp(this.Less, (t, e) => t.LessThan(e)),
          this.AddListBinaryOp(this.GreaterThanOrEquals, (t, e) =>
            t.GreaterThanOrEquals(e)
          ),
          this.AddListBinaryOp(this.LessThanOrEquals, (t, e) =>
            t.LessThanOrEquals(e)
          ),
          this.AddListBinaryOp(this.NotEquals, (t, e) => !t.Equals(e)),
          this.AddListBinaryOp(this.And, (t, e) => t.Count > 0 && e.Count > 0),
          this.AddListBinaryOp(this.Or, (t, e) => t.Count > 0 || e.Count > 0),
          this.AddListUnaryOp(this.Not, (t) => (0 == t.Count ? 1 : 0)),
          this.AddListUnaryOp(this.Invert, (t) => t.inverse),
          this.AddListUnaryOp(this.All, (t) => t.all),
          this.AddListUnaryOp(this.ListMin, (t) => t.MinAsList()),
          this.AddListUnaryOp(this.ListMax, (t) => t.MaxAsList()),
          this.AddListUnaryOp(this.Count, (t) => t.Count),
          this.AddListUnaryOp(this.ValueOfList, (t) => t.maxItem.Value);
        let t = (t, e) => t.Equals(e),
          e = (t, e) => !t.Equals(e);
        this.AddOpToNativeFunc(this.Equal, 2, i.DivertTarget, t),
          this.AddOpToNativeFunc(this.NotEquals, 2, i.DivertTarget, e);
      }
    }
    AddOpFuncForType(t, e) {
      null == this._operationFuncs && (this._operationFuncs = new Map()),
        this._operationFuncs.set(t, e);
    }
    static AddOpToNativeFunc(t, e, n, i) {
      if (null === this._nativeFunctions)
        return p("NativeFunctionCall._nativeFunctions");
      let r = this._nativeFunctions.get(t);
      r || ((r = new D(t, e)), this._nativeFunctions.set(t, r)),
        r.AddOpFuncForType(n, i);
    }
    static AddIntBinaryOp(t, e) {
      this.AddOpToNativeFunc(t, 2, i.Int, e);
    }
    static AddIntUnaryOp(t, e) {
      this.AddOpToNativeFunc(t, 1, i.Int, e);
    }
    static AddFloatBinaryOp(t, e) {
      this.AddOpToNativeFunc(t, 2, i.Float, e);
    }
    static AddFloatUnaryOp(t, e) {
      this.AddOpToNativeFunc(t, 1, i.Float, e);
    }
    static AddStringBinaryOp(t, e) {
      this.AddOpToNativeFunc(t, 2, i.String, e);
    }
    static AddListBinaryOp(t, e) {
      this.AddOpToNativeFunc(t, 2, i.List, e);
    }
    static AddListUnaryOp(t, e) {
      this.AddOpToNativeFunc(t, 1, i.List, e);
    }
    toString() {
      return 'Native "' + this.name + '"';
    }
  }
  (D.Add = "+"),
    (D.Subtract = "-"),
    (D.Divide = "/"),
    (D.Multiply = "*"),
    (D.Mod = "%"),
    (D.Negate = "_"),
    (D.Equal = "=="),
    (D.Greater = ">"),
    (D.Less = "<"),
    (D.GreaterThanOrEquals = ">="),
    (D.LessThanOrEquals = "<="),
    (D.NotEquals = "!="),
    (D.Not = "!"),
    (D.And = "&&"),
    (D.Or = "||"),
    (D.Min = "MIN"),
    (D.Max = "MAX"),
    (D.Pow = "POW"),
    (D.Floor = "FLOOR"),
    (D.Ceiling = "CEILING"),
    (D.Int = "INT"),
    (D.Float = "FLOAT"),
    (D.Has = "?"),
    (D.Hasnt = "!?"),
    (D.Intersect = "^"),
    (D.ListMin = "LIST_MIN"),
    (D.ListMax = "LIST_MAX"),
    (D.All = "LIST_ALL"),
    (D.Count = "LIST_COUNT"),
    (D.ValueOfList = "LIST_VALUE"),
    (D.Invert = "LIST_INVERT"),
    (D._nativeFunctions = null);
  class B extends m {
    constructor(t) {
      super(), (this.text = t.toString() || "");
    }
    toString() {
      return "# " + this.text;
    }
  }
  class G extends m {
    constructor() {
      super(...arguments),
        (this.text = ""),
        (this.index = 0),
        (this.threadAtGeneration = null),
        (this.sourcePath = ""),
        (this.targetPath = null),
        (this.isInvisibleDefault = !1),
        (this.originalThreadIndex = 0);
    }
    get pathStringOnChoice() {
      return null === this.targetPath
        ? p("Choice.targetPath")
        : this.targetPath.toString();
    }
    set pathStringOnChoice(t) {
      this.targetPath = new e(t);
    }
  }
  class M {
    constructor(t, e) {
      (this._name = t || ""),
        (this._items = null),
        (this._itemNameToValues = e || new Map());
    }
    get name() {
      return this._name;
    }
    get items() {
      if (null == this._items) {
        this._items = new Map();
        for (let [t, e] of this._itemNameToValues) {
          let n = new g(this.name, t);
          this._items.set(n.serialized(), e);
        }
      }
      return this._items;
    }
    ValueForItem(t) {
      if (!t.itemName) return 0;
      let e = this._itemNameToValues.get(t.itemName);
      return void 0 !== e ? e : 0;
    }
    ContainsItem(t) {
      return (
        !!t.itemName &&
        t.originName == this.name &&
        this._itemNameToValues.has(t.itemName)
      );
    }
    ContainsItemWithName(t) {
      return this._itemNameToValues.has(t);
    }
    TryGetItemWithValue(t, e) {
      for (let [e, n] of this._itemNameToValues)
        if (n == t) return { result: new g(this.name, e), exists: !0 };
      return { result: g.Null, exists: !1 };
    }
    TryGetValueForItem(t, e) {
      if (!t.itemName) return { result: 0, exists: !1 };
      let n = this._itemNameToValues.get(t.itemName);
      return n ? { result: n, exists: !0 } : { result: 0, exists: !1 };
    }
  }
  class J {
    constructor(t) {
      (this._lists = new Map()),
        (this._allUnambiguousListValueCache = new Map());
      for (let e of t) {
        this._lists.set(e.name, e);
        for (let [t, n] of e.items) {
          let e = g.fromSerializedKey(t),
            i = new N(e, n);
          if (!e.itemName)
            throw new Error("item.itemName is null or undefined.");
          this._allUnambiguousListValueCache.set(e.itemName, i),
            this._allUnambiguousListValueCache.set(e.fullName, i);
        }
      }
    }
    get lists() {
      let t = [];
      for (let [, e] of this._lists) t.push(e);
      return t;
    }
    TryListGetDefinition(t, e) {
      if (null === t) return { result: e, exists: !1 };
      let n = this._lists.get(t);
      return n ? { result: n, exists: !0 } : { result: e, exists: !1 };
    }
    FindSingleItemListWithName(t) {
      if (null === t) return p("name");
      let e = this._allUnambiguousListValueCache.get(t);
      return void 0 !== e ? e : null;
    }
  }
  class q {
    static JArrayToRuntimeObjList(t, e = !1) {
      let n = t.length;
      e && n--;
      let i = [];
      for (let e = 0; e < n; e++) {
        let n = t[e],
          r = this.JTokenToRuntimeObject(n);
        if (null === r) return p("runtimeObj");
        i.push(r);
      }
      return i;
    }
    static WriteDictionaryRuntimeObjs(t, e) {
      t.WriteObjectStart();
      for (let [n, i] of e)
        t.WritePropertyStart(n),
          this.WriteRuntimeObject(t, i),
          t.WritePropertyEnd();
      t.WriteObjectEnd();
    }
    static WriteListRuntimeObjs(t, e) {
      t.WriteArrayStart();
      for (let n of e) this.WriteRuntimeObject(t, n);
      t.WriteArrayEnd();
    }
    static WriteIntDictionary(t, e) {
      t.WriteObjectStart();
      for (let [n, i] of e) t.WriteIntProperty(n, i);
      t.WriteObjectEnd();
    }
    static WriteRuntimeObject(t, e) {
      let n = s(e, x);
      if (n) return void this.WriteRuntimeContainer(t, n);
      let i = s(e, W);
      if (i) {
        let e,
          n = "->";
        return (
          i.isExternal
            ? (n = "x()")
            : i.pushesToStack &&
              (i.stackPushType == r.Function
                ? (n = "f()")
                : i.stackPushType == r.Tunnel && (n = "->t->")),
          (e = i.hasVariableTarget ? i.variableDivertName : i.targetPathString),
          t.WriteObjectStart(),
          t.WriteProperty(n, e),
          i.hasVariableTarget && t.WriteProperty("var", !0),
          i.isConditional && t.WriteProperty("c", !0),
          i.externalArgs > 0 && t.WriteIntProperty("exArgs", i.externalArgs),
          void t.WriteObjectEnd()
        );
      }
      let a = s(e, V);
      if (a)
        return (
          t.WriteObjectStart(),
          t.WriteProperty("*", a.pathStringOnChoice),
          t.WriteIntProperty("flg", a.flags),
          void t.WriteObjectEnd()
        );
      let l = s(e, _);
      if (l) return void t.WriteBool(l.value);
      let o = s(e, w);
      if (o) return void t.WriteInt(o.value);
      let u = s(e, T);
      if (u) return void t.WriteFloat(u.value);
      let h = s(e, E);
      if (h)
        return void (h.isNewline
          ? t.Write("\n", !1)
          : (t.WriteStringStart(),
            t.WriteStringInner("^"),
            t.WriteStringInner(h.value),
            t.WriteStringEnd()));
      let c = s(e, N);
      if (c) return void this.WriteInkList(t, c);
      let d = s(e, P);
      if (d)
        return (
          t.WriteObjectStart(),
          null === d.value
            ? p("divTargetVal.value")
            : (t.WriteProperty("^->", d.value.componentsString),
              void t.WriteObjectEnd())
        );
      let m = s(e, O);
      if (m)
        return (
          t.WriteObjectStart(),
          t.WriteProperty("^var", m.value),
          t.WriteIntProperty("ci", m.contextIndex),
          void t.WriteObjectEnd()
        );
      if (s(e, I)) return void t.Write("<>");
      let f = s(e, k);
      if (f) return void t.Write(q._controlCommandNames[f.commandType]);
      let g = s(e, D);
      if (g) {
        let e = g.name;
        return "^" == e && (e = "L^"), void t.Write(e);
      }
      let S = s(e, L);
      if (S) {
        t.WriteObjectStart();
        let e = S.pathStringForCount;
        return (
          null != e
            ? t.WriteProperty("CNT?", e)
            : t.WriteProperty("VAR?", S.name),
          void t.WriteObjectEnd()
        );
      }
      let y = s(e, R);
      if (y) {
        t.WriteObjectStart();
        let e = y.isGlobal ? "VAR=" : "temp=";
        return (
          t.WriteProperty(e, y.variableName),
          y.isNewDeclaration || t.WriteProperty("re", !0),
          void t.WriteObjectEnd()
        );
      }
      if (s(e, j)) return void t.Write("void");
      let C = s(e, B);
      if (C)
        return (
          t.WriteObjectStart(),
          t.WriteProperty("#", C.text),
          void t.WriteObjectEnd()
        );
      let v = s(e, G);
      if (!v)
        throw new Error("Failed to convert runtime object to Json token: " + e);
      this.WriteChoice(t, v);
    }
    static JObjectToDictionaryRuntimeObjs(t) {
      let e = new Map();
      for (let n in t)
        if (t.hasOwnProperty(n)) {
          let i = this.JTokenToRuntimeObject(t[n]);
          if (null === i) return p("inkObject");
          e.set(n, i);
        }
      return e;
    }
    static JObjectToIntDictionary(t) {
      let e = new Map();
      for (let n in t) t.hasOwnProperty(n) && e.set(n, parseInt(t[n]));
      return e;
    }
    static JTokenToRuntimeObject(t) {
      if (("number" == typeof t && !isNaN(t)) || "boolean" == typeof t)
        return b.Create(t);
      if ("string" == typeof t) {
        let e = t.toString(),
          n = e[0];
        if ("^" == n) return new E(e.substring(1));
        if ("\n" == n && 1 == e.length) return new E("\n");
        if ("<>" == e) return new I();
        for (let t = 0; t < q._controlCommandNames.length; ++t) {
          if (e == q._controlCommandNames[t]) return new k(t);
        }
        if (("L^" == e && (e = "^"), D.CallExistsWithName(e)))
          return D.CallWithName(e);
        if ("->->" == e) return k.PopTunnel();
        if ("~ret" == e) return k.PopFunction();
        if ("void" == e) return new j();
      }
      if ("object" == typeof t && !Array.isArray(t)) {
        let n,
          i = t;
        if (i["^->"]) return (n = i["^->"]), new P(new e(n.toString()));
        if (i["^var"]) {
          n = i["^var"];
          let t = new O(n.toString());
          return "ci" in i && ((n = i.ci), (t.contextIndex = parseInt(n))), t;
        }
        let a = !1,
          s = !1,
          l = r.Function,
          o = !1;
        if (
          ((n = i["->"])
            ? (a = !0)
            : (n = i["f()"])
            ? ((a = !0), (s = !0), (l = r.Function))
            : (n = i["->t->"])
            ? ((a = !0), (s = !0), (l = r.Tunnel))
            : (n = i["x()"]) &&
              ((a = !0), (o = !0), (s = !1), (l = r.Function)),
          a)
        ) {
          let t = new W();
          (t.pushesToStack = s), (t.stackPushType = l), (t.isExternal = o);
          let e = n.toString();
          return (
            (n = i.var) ? (t.variableDivertName = e) : (t.targetPathString = e),
            (t.isConditional = !!i.c),
            o && (n = i.exArgs) && (t.externalArgs = parseInt(n)),
            t
          );
        }
        if ((n = i["*"])) {
          let t = new V();
          return (
            (t.pathStringOnChoice = n.toString()),
            (n = i.flg) && (t.flags = parseInt(n)),
            t
          );
        }
        if ((n = i["VAR?"])) return new L(n.toString());
        if ((n = i["CNT?"])) {
          let t = new L();
          return (t.pathStringForCount = n.toString()), t;
        }
        let u = !1,
          h = !1;
        if (
          ((n = i["VAR="])
            ? ((u = !0), (h = !0))
            : (n = i["temp="]) && ((u = !0), (h = !1)),
          u)
        ) {
          let t = n.toString(),
            e = !i.re,
            r = new R(t, e);
          return (r.isGlobal = h), r;
        }
        if (void 0 !== i["#"]) return (n = i["#"]), new B(n.toString());
        if ((n = i.list)) {
          let t = n,
            e = new S();
          if ((n = i.origins)) {
            let t = n;
            e.SetInitialOriginNames(t);
          }
          for (let n in t)
            if (t.hasOwnProperty(n)) {
              let i = t[n],
                r = new g(n),
                a = parseInt(i);
              e.Add(r, a);
            }
          return new N(e);
        }
        if (null != i.originalChoicePath) return this.JObjectToChoice(i);
      }
      if (Array.isArray(t)) return this.JArrayToContainer(t);
      if (null == t) return null;
      throw new Error(
        "Failed to convert token to runtime object: " + JSON.stringify(t)
      );
    }
    static WriteRuntimeContainer(t, e, n = !1) {
      if ((t.WriteArrayStart(), null === e)) return p("container");
      for (let n of e.content) this.WriteRuntimeObject(t, n);
      let i = e.namedOnlyContent,
        r = e.countFlags,
        a = null != e.name && !n,
        l = null != i || r > 0 || a;
      if ((l && t.WriteObjectStart(), null != i))
        for (let [e, n] of i) {
          let i = e,
            r = s(n, x);
          t.WritePropertyStart(i),
            this.WriteRuntimeContainer(t, r, !0),
            t.WritePropertyEnd();
        }
      a && t.WriteProperty("#n", e.name),
        l ? t.WriteObjectEnd() : t.WriteNull(),
        t.WriteArrayEnd();
    }
    static JArrayToContainer(t) {
      let e = new x();
      e.content = this.JArrayToRuntimeObjList(t, !0);
      let n = t[t.length - 1];
      if (null != n) {
        let t = new Map();
        for (let i in n)
          if ("#f" == i) e.countFlags = parseInt(n[i]);
          else if ("#n" == i) e.name = n[i].toString();
          else {
            let e = this.JTokenToRuntimeObject(n[i]),
              r = s(e, x);
            r && (r.name = i), t.set(i, e);
          }
        e.namedOnlyContent = t;
      }
      return e;
    }
    static JObjectToChoice(t) {
      let e = new G();
      return (
        (e.text = t.text.toString()),
        (e.index = parseInt(t.index)),
        (e.sourcePath = t.originalChoicePath.toString()),
        (e.originalThreadIndex = parseInt(t.originalThreadIndex)),
        (e.pathStringOnChoice = t.targetPath.toString()),
        e
      );
    }
    static WriteChoice(t, e) {
      t.WriteObjectStart(),
        t.WriteProperty("text", e.text),
        t.WriteIntProperty("index", e.index),
        t.WriteProperty("originalChoicePath", e.sourcePath),
        t.WriteIntProperty("originalThreadIndex", e.originalThreadIndex),
        t.WriteProperty("targetPath", e.pathStringOnChoice),
        t.WriteObjectEnd();
    }
    static WriteInkList(t, e) {
      let n = e.value;
      if (null === n) return p("rawList");
      t.WriteObjectStart(), t.WritePropertyStart("list"), t.WriteObjectStart();
      for (let [e, i] of n) {
        let n = g.fromSerializedKey(e),
          r = i;
        if (null === n.itemName) return p("item.itemName");
        t.WritePropertyNameStart(),
          t.WritePropertyNameInner(n.originName ? n.originName : "?"),
          t.WritePropertyNameInner("."),
          t.WritePropertyNameInner(n.itemName),
          t.WritePropertyNameEnd(),
          t.Write(r),
          t.WritePropertyEnd();
      }
      if (
        (t.WriteObjectEnd(),
        t.WritePropertyEnd(),
        0 == n.Count && null != n.originNames && n.originNames.length > 0)
      ) {
        t.WritePropertyStart("origins"), t.WriteArrayStart();
        for (let e of n.originNames) t.Write(e);
        t.WriteArrayEnd(), t.WritePropertyEnd();
      }
      t.WriteObjectEnd();
    }
    static ListDefinitionsToJToken(t) {
      let e = {};
      for (let n of t.lists) {
        let t = {};
        for (let [e, i] of n.items) {
          let n = g.fromSerializedKey(e);
          if (null === n.itemName) return p("item.itemName");
          t[n.itemName] = i;
        }
        e[n.name] = t;
      }
      return e;
    }
    static JTokenToListDefinitions(t) {
      let e = t,
        n = [];
      for (let t in e)
        if (e.hasOwnProperty(t)) {
          let i = t.toString(),
            r = e[t],
            a = new Map();
          for (let n in r)
            if (e.hasOwnProperty(t)) {
              let t = r[n];
              a.set(n, parseInt(t));
            }
          let s = new M(i, a);
          n.push(s);
        }
      return new J(n);
    }
  }
  q._controlCommandNames = (() => {
    let t = [];
    (t[k.CommandType.EvalStart] = "ev"),
      (t[k.CommandType.EvalOutput] = "out"),
      (t[k.CommandType.EvalEnd] = "/ev"),
      (t[k.CommandType.Duplicate] = "du"),
      (t[k.CommandType.PopEvaluatedValue] = "pop"),
      (t[k.CommandType.PopFunction] = "~ret"),
      (t[k.CommandType.PopTunnel] = "->->"),
      (t[k.CommandType.BeginString] = "str"),
      (t[k.CommandType.EndString] = "/str"),
      (t[k.CommandType.NoOp] = "nop"),
      (t[k.CommandType.ChoiceCount] = "choiceCnt"),
      (t[k.CommandType.Turns] = "turn"),
      (t[k.CommandType.TurnsSince] = "turns"),
      (t[k.CommandType.ReadCount] = "readc"),
      (t[k.CommandType.Random] = "rnd"),
      (t[k.CommandType.SeedRandom] = "srnd"),
      (t[k.CommandType.VisitIndex] = "visit"),
      (t[k.CommandType.SequenceShuffleIndex] = "seq"),
      (t[k.CommandType.StartThread] = "thread"),
      (t[k.CommandType.Done] = "done"),
      (t[k.CommandType.End] = "end"),
      (t[k.CommandType.ListFromInt] = "listInt"),
      (t[k.CommandType.ListRange] = "range"),
      (t[k.CommandType.ListRandom] = "lrnd");
    for (let e = 0; e < k.CommandType.TOTAL_VALUES; ++e)
      if (null == t[e])
        throw new Error("Control command not accounted for in serialisation");
    return t;
  })();
  class U {
    constructor() {
      if (
        ((this._threadCounter = 0),
        (this._startOfRoot = F.Null),
        arguments[0] instanceof Z)
      ) {
        let t = arguments[0];
        (this._startOfRoot = F.StartOf(t.rootContentContainer)), this.Reset();
      } else {
        let t = arguments[0];
        this._threads = [];
        for (let e of t._threads) this._threads.push(e.Copy());
        (this._threadCounter = t._threadCounter),
          (this._startOfRoot = t._startOfRoot.copy());
      }
    }
    get elements() {
      return this.callStack;
    }
    get depth() {
      return this.elements.length;
    }
    get currentElement() {
      let t = this._threads[this._threads.length - 1].callstack;
      return t[t.length - 1];
    }
    get currentElementIndex() {
      return this.callStack.length - 1;
    }
    get currentThread() {
      return this._threads[this._threads.length - 1];
    }
    set currentThread(t) {
      n.Assert(
        1 == this._threads.length,
        "Shouldn't be directly setting the current thread when we have a stack of them"
      ),
        (this._threads.length = 0),
        this._threads.push(t);
    }
    get canPop() {
      return this.callStack.length > 1;
    }
    Reset() {
      (this._threads = []),
        this._threads.push(new U.Thread()),
        this._threads[0].callstack.push(
          new U.Element(r.Tunnel, this._startOfRoot)
        );
    }
    SetJsonToken(t, e) {
      this._threads.length = 0;
      let n = t.threads;
      for (let t of n) {
        let n = t,
          i = new U.Thread(n, e);
        this._threads.push(i);
      }
      (this._threadCounter = parseInt(t.threadCounter)),
        (this._startOfRoot = F.StartOf(e.rootContentContainer));
    }
    WriteJson(t) {
      t.WriteObject((t) => {
        t.WritePropertyStart("threads"), t.WriteArrayStart();
        for (let e of this._threads) e.WriteJson(t);
        t.WriteArrayEnd(),
          t.WritePropertyEnd(),
          t.WritePropertyStart("threadCounter"),
          t.WriteInt(this._threadCounter),
          t.WritePropertyEnd();
      });
    }
    PushThread() {
      let t = this.currentThread.Copy();
      this._threadCounter++,
        (t.threadIndex = this._threadCounter),
        this._threads.push(t);
    }
    ForkThread() {
      let t = this.currentThread.Copy();
      return this._threadCounter++, (t.threadIndex = this._threadCounter), t;
    }
    PopThread() {
      if (!this.canPopThread) throw new Error("Can't pop thread");
      this._threads.splice(this._threads.indexOf(this.currentThread), 1);
    }
    get canPopThread() {
      return this._threads.length > 1 && !this.elementIsEvaluateFromGame;
    }
    get elementIsEvaluateFromGame() {
      return this.currentElement.type == r.FunctionEvaluationFromGame;
    }
    Push(t, e = 0, n = 0) {
      let i = new U.Element(t, this.currentElement.currentPointer, !1);
      (i.evaluationStackHeightWhenPushed = e),
        (i.functionStartInOutputStream = n),
        this.callStack.push(i);
    }
    CanPop(t = null) {
      return !!this.canPop && (null == t || this.currentElement.type == t);
    }
    Pop(t = null) {
      if (!this.CanPop(t)) throw new Error("Mismatched push/pop in Callstack");
      this.callStack.pop();
    }
    GetTemporaryVariableWithName(t, e = -1) {
      -1 == e && (e = this.currentElementIndex + 1);
      let n = C(this.callStack[e - 1].temporaryVariables, t, null);
      return n.exists ? n.result : null;
    }
    SetTemporaryVariable(t, e, n, i = -1) {
      -1 == i && (i = this.currentElementIndex + 1);
      let r = this.callStack[i - 1];
      if (!n && !r.temporaryVariables.get(t))
        throw new Error("Could not find temporary variable to set: " + t);
      let a = C(r.temporaryVariables, t, null);
      a.exists && N.RetainListOriginsForAssignment(a.result, e),
        r.temporaryVariables.set(t, e);
    }
    ContextForVariableNamed(t) {
      return this.currentElement.temporaryVariables.get(t)
        ? this.currentElementIndex + 1
        : 0;
    }
    ThreadWithIndex(t) {
      let e = this._threads.filter((e) => {
        if (e.threadIndex == t) return e;
      });
      return e.length > 0 ? e[0] : null;
    }
    get callStack() {
      return this.currentThread.callstack;
    }
    get callStackTrace() {
      let t = new f();
      for (let e = 0; e < this._threads.length; e++) {
        let n = this._threads[e],
          i = e == this._threads.length - 1;
        t.AppendFormat(
          "=== THREAD {0}/{1} {2}===\n",
          e + 1,
          this._threads.length,
          i ? "(current) " : ""
        );
        for (let e = 0; e < n.callstack.length; e++) {
          n.callstack[e].type == r.Function
            ? t.Append("  [FUNCTION] ")
            : t.Append("  [TUNNEL] ");
          let i = n.callstack[e].currentPointer;
          if (!i.isNull) {
            if ((t.Append("<SOMEWHERE IN "), null === i.container))
              return p("pointer.container");
            t.Append(i.container.path.toString()), t.AppendLine(">");
          }
        }
      }
      return t.toString();
    }
  }
  !(function (t) {
    class n {
      constructor(t, e, n = !1) {
        (this.evaluationStackHeightWhenPushed = 0),
          (this.functionStartInOutputStream = 0),
          (this.currentPointer = e.copy()),
          (this.inExpressionEvaluation = n),
          (this.temporaryVariables = new Map()),
          (this.type = t);
      }
      Copy() {
        let t = new n(
          this.type,
          this.currentPointer,
          this.inExpressionEvaluation
        );
        return (
          (t.temporaryVariables = new Map(this.temporaryVariables)),
          (t.evaluationStackHeightWhenPushed =
            this.evaluationStackHeightWhenPushed),
          (t.functionStartInOutputStream = this.functionStartInOutputStream),
          t
        );
      }
    }
    t.Element = n;
    class i {
      constructor() {
        if (
          ((this.threadIndex = 0),
          (this.previousPointer = F.Null),
          (this.callstack = []),
          arguments[0] && arguments[1])
        ) {
          let t = arguments[0],
            i = arguments[1];
          this.threadIndex = parseInt(t.threadIndex);
          let r = t.callstack;
          for (let t of r) {
            let r,
              a = t,
              s = parseInt(a.type),
              l = F.Null,
              o = a.cPath;
            if (void 0 !== o) {
              r = o.toString();
              let t = i.ContentAtPath(new e(r));
              if (
                ((l.container = t.container),
                (l.index = parseInt(a.idx)),
                null == t.obj)
              )
                throw new Error(
                  "When loading state, internal story location couldn't be found: " +
                    r +
                    ". Has the story changed since this save data was created?"
                );
              if (t.approximate) {
                if (null === l.container) return p("pointer.container");
                i.Warning(
                  "When loading state, exact internal story location couldn't be found: '" +
                    r +
                    "', so it was approximated to '" +
                    l.container.path.toString() +
                    "' to recover. Has the story changed since this save data was created?"
                );
              }
            }
            let u = !!a.exp,
              h = new n(s, l, u),
              c = a.temp;
            void 0 !== c
              ? (h.temporaryVariables = q.JObjectToDictionaryRuntimeObjs(c))
              : h.temporaryVariables.clear(),
              this.callstack.push(h);
          }
          let a = t.previousContentObject;
          if (void 0 !== a) {
            let t = new e(a.toString());
            this.previousPointer = i.PointerAtPath(t);
          }
        }
      }
      Copy() {
        let t = new i();
        t.threadIndex = this.threadIndex;
        for (let e of this.callstack) t.callstack.push(e.Copy());
        return (t.previousPointer = this.previousPointer.copy()), t;
      }
      WriteJson(t) {
        t.WriteObjectStart(),
          t.WritePropertyStart("callstack"),
          t.WriteArrayStart();
        for (let e of this.callstack) {
          if ((t.WriteObjectStart(), !e.currentPointer.isNull)) {
            if (null === e.currentPointer.container)
              return p("el.currentPointer.container");
            t.WriteProperty(
              "cPath",
              e.currentPointer.container.path.componentsString
            ),
              t.WriteIntProperty("idx", e.currentPointer.index);
          }
          t.WriteProperty("exp", e.inExpressionEvaluation),
            t.WriteIntProperty("type", e.type),
            e.temporaryVariables.size > 0 &&
              (t.WritePropertyStart("temp"),
              q.WriteDictionaryRuntimeObjs(t, e.temporaryVariables),
              t.WritePropertyEnd()),
            t.WriteObjectEnd();
        }
        if (
          (t.WriteArrayEnd(),
          t.WritePropertyEnd(),
          t.WriteIntProperty("threadIndex", this.threadIndex),
          !this.previousPointer.isNull)
        ) {
          let e = this.previousPointer.Resolve();
          if (null === e) return p("this.previousPointer.Resolve()");
          t.WriteProperty("previousContentObject", e.path.toString());
        }
        t.WriteObjectEnd();
      }
    }
    t.Thread = i;
  })(U || (U = {}));
  class K {
    constructor(t, e) {
      (this.variableChangedEventCallbacks = []),
        (this.patch = null),
        (this._batchObservingVariableChanges = !1),
        (this._defaultGlobalVariables = new Map()),
        (this._changedVariablesForBatchObs = new Set()),
        (this._globalVariables = new Map()),
        (this._callStack = t),
        (this._listDefsOrigin = e);
      try {
        return new Proxy(this, {
          get: (t, e) => (e in t ? t[e] : t.$(e)),
          set: (t, e, n) => (e in t ? (t[e] = n) : t.$(e, n), !0),
        });
      } catch (t) {}
    }
    variableChangedEvent(t, e) {
      for (let n of this.variableChangedEventCallbacks) n(t, e);
    }
    get batchObservingVariableChanges() {
      return this._batchObservingVariableChanges;
    }
    set batchObservingVariableChanges(t) {
      if (((this._batchObservingVariableChanges = t), t))
        this._changedVariablesForBatchObs = new Set();
      else if (null != this._changedVariablesForBatchObs) {
        for (let t of this._changedVariablesForBatchObs) {
          let e = this._globalVariables.get(t);
          e ? this.variableChangedEvent(t, e) : p("currentValue");
        }
        this._changedVariablesForBatchObs = null;
      }
    }
    get callStack() {
      return this._callStack;
    }
    set callStack(t) {
      this._callStack = t;
    }
    $(t, e) {
      if (void 0 === e) {
        let e = null;
        return null !== this.patch &&
          ((e = this.patch.TryGetGlobal(t, null)), e.exists)
          ? e.result.valueObject
          : ((e = this._globalVariables.get(t)),
            void 0 === e && (e = this._defaultGlobalVariables.get(t)),
            void 0 !== e ? e.valueObject : null);
      }
      {
        if (void 0 === this._defaultGlobalVariables.get(t))
          throw new y(
            "Cannot assign to a variable (" +
              t +
              ") that hasn't been declared in the story"
          );
        let n = b.Create(e);
        if (null == n)
          throw null == e
            ? new Error("Cannot pass null to VariableState")
            : new Error(
                "Invalid value passed to VariableState: " + e.toString()
              );
        this.SetGlobal(t, n);
      }
    }
    ApplyPatch() {
      if (null === this.patch) return p("this.patch");
      for (let [t, e] of this.patch.globals) this._globalVariables.set(t, e);
      if (null !== this._changedVariablesForBatchObs)
        for (let t of this.patch.changedVariables)
          this._changedVariablesForBatchObs.add(t);
      this.patch = null;
    }
    SetJsonToken(t) {
      this._globalVariables.clear();
      for (let [e, n] of this._defaultGlobalVariables) {
        let i = t[e];
        if (void 0 !== i) {
          let t = q.JTokenToRuntimeObject(i);
          if (null === t) return p("tokenInkObject");
          this._globalVariables.set(e, t);
        } else this._globalVariables.set(e, n);
      }
    }
    WriteJson(t) {
      t.WriteObjectStart();
      for (let [e, n] of this._globalVariables) {
        let i = e,
          r = n;
        if (K.dontSaveDefaultValues && this._defaultGlobalVariables.has(i)) {
          let t = this._defaultGlobalVariables.get(i);
          if (this.RuntimeObjectsEqual(r, t)) continue;
        }
        t.WritePropertyStart(i),
          q.WriteRuntimeObject(t, r),
          t.WritePropertyEnd();
      }
      t.WriteObjectEnd();
    }
    RuntimeObjectsEqual(t, e) {
      if (null === t) return p("obj1");
      if (null === e) return p("obj2");
      if (t.constructor !== e.constructor) return !1;
      let n = s(t, _);
      if (null !== n) return n.value === l(e, _).value;
      let i = s(t, w);
      if (null !== i) return i.value === l(e, w).value;
      let r = s(t, T);
      if (null !== r) return r.value === l(e, T).value;
      let a = s(t, b),
        o = s(e, b);
      if (null !== a && null !== o)
        return h(a.valueObject) && h(o.valueObject)
          ? a.valueObject.Equals(o.valueObject)
          : a.valueObject === o.valueObject;
      throw new Error(
        "FastRoughDefinitelyEquals: Unsupported runtime object type: " +
          t.constructor.name
      );
    }
    GetVariableWithName(t, e = -1) {
      let n = this.GetRawVariableWithName(t, e),
        i = s(n, O);
      return null !== i && (n = this.ValueAtVariablePointer(i)), n;
    }
    TryGetDefaultVariableValue(t) {
      let e = C(this._defaultGlobalVariables, t, null);
      return e.exists ? e.result : null;
    }
    GlobalVariableExistsWithName(t) {
      return (
        this._globalVariables.has(t) ||
        (null !== this._defaultGlobalVariables &&
          this._defaultGlobalVariables.has(t))
      );
    }
    GetRawVariableWithName(t, e) {
      let n = null;
      if (0 == e || -1 == e) {
        let e = null;
        if (
          null !== this.patch &&
          ((e = this.patch.TryGetGlobal(t, null)), e.exists)
        )
          return e.result;
        if (((e = C(this._globalVariables, t, null)), e.exists))
          return e.result;
        if (
          null !== this._defaultGlobalVariables &&
          ((e = C(this._defaultGlobalVariables, t, null)), e.exists)
        )
          return e.result;
        if (null === this._listDefsOrigin)
          return p("VariablesState._listDefsOrigin");
        let n = this._listDefsOrigin.FindSingleItemListWithName(t);
        if (n) return n;
      }
      return (n = this._callStack.GetTemporaryVariableWithName(t, e)), n;
    }
    ValueAtVariablePointer(t) {
      return this.GetVariableWithName(t.variableName, t.contextIndex);
    }
    Assign(t, e) {
      let n = t.variableName;
      if (null === n) return p("name");
      let i = -1,
        r = !1;
      if (
        ((r = t.isNewDeclaration
          ? t.isGlobal
          : this.GlobalVariableExistsWithName(n)),
        t.isNewDeclaration)
      ) {
        let t = s(e, O);
        if (null !== t) {
          e = this.ResolveVariablePointer(t);
        }
      } else {
        let t = null;
        do {
          (t = s(this.GetRawVariableWithName(n, i), O)),
            null != t &&
              ((n = t.variableName), (i = t.contextIndex), (r = 0 == i));
        } while (null != t);
      }
      r
        ? this.SetGlobal(n, e)
        : this._callStack.SetTemporaryVariable(n, e, t.isNewDeclaration, i);
    }
    SnapshotDefaultGlobals() {
      this._defaultGlobalVariables = new Map(this._globalVariables);
    }
    RetainListOriginsForAssignment(t, e) {
      let n = l(t, N),
        i = l(e, N);
      n.value &&
        i.value &&
        0 == i.value.Count &&
        i.value.SetInitialOriginNames(n.value.originNames);
    }
    SetGlobal(t, e) {
      let n = null;
      if (
        (null === this.patch && (n = C(this._globalVariables, t, null)),
        null !== this.patch &&
          ((n = this.patch.TryGetGlobal(t, null)),
          n.exists || (n = C(this._globalVariables, t, null))),
        N.RetainListOriginsForAssignment(n.result, e),
        null === t)
      )
        return p("variableName");
      if (
        (null !== this.patch
          ? this.patch.SetGlobal(t, e)
          : this._globalVariables.set(t, e),
        null !== this.variableChangedEvent && null !== n && e !== n.result)
      )
        if (this.batchObservingVariableChanges) {
          if (null === this._changedVariablesForBatchObs)
            return p("this._changedVariablesForBatchObs");
          null !== this.patch
            ? this.patch.AddChangedVariable(t)
            : null !== this._changedVariablesForBatchObs &&
              this._changedVariablesForBatchObs.add(t);
        } else this.variableChangedEvent(t, e);
    }
    ResolveVariablePointer(t) {
      let e = t.contextIndex;
      -1 == e && (e = this.GetContextIndexOfVariableNamed(t.variableName));
      let n = s(this.GetRawVariableWithName(t.variableName, e), O);
      return null != n ? n : new O(t.variableName, e);
    }
    GetContextIndexOfVariableNamed(t) {
      return this.GlobalVariableExistsWithName(t)
        ? 0
        : this._callStack.currentElementIndex;
    }
    ObserveVariableChange(t) {
      this.variableChangedEventCallbacks.push(t);
    }
  }
  K.dontSaveDefaultValues = !0;
  class z {
    constructor(t) {
      (this.seed = t % 2147483647), this.seed <= 0 && (this.seed += 2147483646);
    }
    next() {
      return (this.seed = (16807 * this.seed) % 2147483647);
    }
    nextFloat() {
      return (this.next() - 1) / 2147483646;
    }
  }
  class H {
    constructor() {
      if (
        ((this._changedVariables = new Set()),
        (this._visitCounts = new Map()),
        (this._turnIndices = new Map()),
        1 === arguments.length && null !== arguments[0])
      ) {
        let t = arguments[0];
        (this._globals = new Map(t._globals)),
          (this._changedVariables = new Set(t._changedVariables)),
          (this._visitCounts = new Map(t._visitCounts)),
          (this._turnIndices = new Map(t._turnIndices));
      } else (this._globals = new Map()), (this._changedVariables = new Set()), (this._visitCounts = new Map()), (this._turnIndices = new Map());
    }
    get globals() {
      return this._globals;
    }
    get changedVariables() {
      return this._changedVariables;
    }
    get visitCounts() {
      return this._visitCounts;
    }
    get turnIndices() {
      return this._turnIndices;
    }
    TryGetGlobal(t, e) {
      return null !== t && this._globals.has(t)
        ? { result: this._globals.get(t), exists: !0 }
        : { result: e, exists: !1 };
    }
    SetGlobal(t, e) {
      this._globals.set(t, e);
    }
    AddChangedVariable(t) {
      return this._changedVariables.add(t);
    }
    TryGetVisitCount(t, e) {
      return this._visitCounts.has(t)
        ? { result: this._visitCounts.get(t), exists: !0 }
        : { result: e, exists: !1 };
    }
    SetVisitCount(t, e) {
      this._visitCounts.set(t, e);
    }
    SetTurnIndex(t, e) {
      this._turnIndices.set(t, e);
    }
    TryGetTurnIndex(t, e) {
      return this._turnIndices.has(t)
        ? { result: this._turnIndices.get(t), exists: !0 }
        : { result: e, exists: !1 };
    }
  }
  class X {
    static TextToDictionary(t) {
      return new X.Reader(t).ToDictionary();
    }
    static TextToArray(t) {
      return new X.Reader(t).ToArray();
    }
  }
  !(function (t) {
    t.Reader = class {
      constructor(t) {
        this._rootObject = JSON.parse(t);
      }
      ToDictionary() {
        return this._rootObject;
      }
      ToArray() {
        return this._rootObject;
      }
    };
    class e {
      constructor() {
        (this._currentPropertyName = null),
          (this._currentString = null),
          (this._stateStack = []),
          (this._collectionStack = []),
          (this._propertyNameStack = []),
          (this._jsonObject = null);
      }
      WriteObject(t) {
        this.WriteObjectStart(), t(this), this.WriteObjectEnd();
      }
      WriteObjectStart() {
        this.StartNewObject(!0);
        let e = {};
        if (this.state === t.Writer.State.Property) {
          this.Assert(null !== this.currentCollection),
            this.Assert(null !== this.currentPropertyName);
          let t = this._propertyNameStack.pop();
          (this.currentCollection[t] = e), this._collectionStack.push(e);
        } else this.state === t.Writer.State.Array ? (this.Assert(null !== this.currentCollection), this.currentCollection.push(e), this._collectionStack.push(e)) : (this.Assert(this.state === t.Writer.State.None), (this._jsonObject = e), this._collectionStack.push(e));
        this._stateStack.push(new t.Writer.StateElement(t.Writer.State.Object));
      }
      WriteObjectEnd() {
        this.Assert(this.state === t.Writer.State.Object),
          this._collectionStack.pop(),
          this._stateStack.pop();
      }
      WriteProperty(t, e) {
        if ((this.WritePropertyStart(t), arguments[1] instanceof Function)) {
          (0, arguments[1])(this);
        } else {
          let t = arguments[1];
          this.Write(t);
        }
        this.WritePropertyEnd();
      }
      WriteIntProperty(t, e) {
        this.WritePropertyStart(t), this.WriteInt(e), this.WritePropertyEnd();
      }
      WriteFloatProperty(t, e) {
        this.WritePropertyStart(t), this.WriteFloat(e), this.WritePropertyEnd();
      }
      WritePropertyStart(e) {
        this.Assert(this.state === t.Writer.State.Object),
          this._propertyNameStack.push(e),
          this.IncrementChildCount(),
          this._stateStack.push(
            new t.Writer.StateElement(t.Writer.State.Property)
          );
      }
      WritePropertyEnd() {
        this.Assert(this.state === t.Writer.State.Property),
          this.Assert(1 === this.childCount),
          this._stateStack.pop();
      }
      WritePropertyNameStart() {
        this.Assert(this.state === t.Writer.State.Object),
          this.IncrementChildCount(),
          (this._currentPropertyName = ""),
          this._stateStack.push(
            new t.Writer.StateElement(t.Writer.State.Property)
          ),
          this._stateStack.push(
            new t.Writer.StateElement(t.Writer.State.PropertyName)
          );
      }
      WritePropertyNameEnd() {
        this.Assert(this.state === t.Writer.State.PropertyName),
          this.Assert(null !== this._currentPropertyName),
          this._propertyNameStack.push(this._currentPropertyName),
          (this._currentPropertyName = null),
          this._stateStack.pop();
      }
      WritePropertyNameInner(e) {
        this.Assert(this.state === t.Writer.State.PropertyName),
          this.Assert(null !== this._currentPropertyName),
          (this._currentPropertyName += e);
      }
      WriteArrayStart() {
        this.StartNewObject(!0);
        let e = [];
        if (this.state === t.Writer.State.Property) {
          this.Assert(null !== this.currentCollection),
            this.Assert(null !== this.currentPropertyName);
          let t = this._propertyNameStack.pop();
          (this.currentCollection[t] = e), this._collectionStack.push(e);
        } else this.state === t.Writer.State.Array ? (this.Assert(null !== this.currentCollection), this.currentCollection.push(e), this._collectionStack.push(e)) : (this.Assert(this.state === t.Writer.State.None), (this._jsonObject = e), this._collectionStack.push(e));
        this._stateStack.push(new t.Writer.StateElement(t.Writer.State.Array));
      }
      WriteArrayEnd() {
        this.Assert(this.state === t.Writer.State.Array),
          this._collectionStack.pop(),
          this._stateStack.pop();
      }
      Write(t, e = !0) {
        null !== t
          ? (this.StartNewObject(!1), this._addToCurrentObject(t))
          : console.error("Warning: trying to write a null string");
      }
      WriteBool(t) {
        null !== t && (this.StartNewObject(!1), this._addToCurrentObject(t));
      }
      WriteInt(t) {
        null !== t &&
          (this.StartNewObject(!1), this._addToCurrentObject(Math.floor(t)));
      }
      WriteFloat(t) {
        null !== t &&
          (this.StartNewObject(!1),
          t == Number.POSITIVE_INFINITY
            ? this._addToCurrentObject(34e37)
            : t == Number.NEGATIVE_INFINITY
            ? this._addToCurrentObject(-34e37)
            : isNaN(t)
            ? this._addToCurrentObject(0)
            : this._addToCurrentObject(t));
      }
      WriteNull() {
        this.StartNewObject(!1), this._addToCurrentObject(null);
      }
      WriteStringStart() {
        this.StartNewObject(!1),
          (this._currentString = ""),
          this._stateStack.push(
            new t.Writer.StateElement(t.Writer.State.String)
          );
      }
      WriteStringEnd() {
        this.Assert(this.state == t.Writer.State.String),
          this._stateStack.pop(),
          this._addToCurrentObject(this._currentString),
          (this._currentString = null);
      }
      WriteStringInner(e, n = !0) {
        this.Assert(this.state === t.Writer.State.String),
          null !== e
            ? (this._currentString += e)
            : console.error("Warning: trying to write a null string");
      }
      ToString() {
        return null === this._jsonObject
          ? ""
          : JSON.stringify(this._jsonObject);
      }
      StartNewObject(e) {
        e
          ? this.Assert(
              this.state === t.Writer.State.None ||
                this.state === t.Writer.State.Property ||
                this.state === t.Writer.State.Array
            )
          : this.Assert(
              this.state === t.Writer.State.Property ||
                this.state === t.Writer.State.Array
            ),
          this.state === t.Writer.State.Property &&
            this.Assert(0 === this.childCount),
          (this.state !== t.Writer.State.Array &&
            this.state !== t.Writer.State.Property) ||
            this.IncrementChildCount();
      }
      get state() {
        return this._stateStack.length > 0
          ? this._stateStack[this._stateStack.length - 1].type
          : t.Writer.State.None;
      }
      get childCount() {
        return this._stateStack.length > 0
          ? this._stateStack[this._stateStack.length - 1].childCount
          : 0;
      }
      get currentCollection() {
        return this._collectionStack.length > 0
          ? this._collectionStack[this._collectionStack.length - 1]
          : null;
      }
      get currentPropertyName() {
        return this._propertyNameStack.length > 0
          ? this._propertyNameStack[this._propertyNameStack.length - 1]
          : null;
      }
      IncrementChildCount() {
        this.Assert(this._stateStack.length > 0);
        let t = this._stateStack.pop();
        t.childCount++, this._stateStack.push(t);
      }
      Assert(t) {
        if (!t) throw Error("Assert failed while writing JSON");
      }
      _addToCurrentObject(e) {
        this.Assert(null !== this.currentCollection),
          this.state === t.Writer.State.Array
            ? (this.Assert(Array.isArray(this.currentCollection)),
              this.currentCollection.push(e))
            : this.state === t.Writer.State.Property &&
              (this.Assert(!Array.isArray(this.currentCollection)),
              this.Assert(null !== this.currentPropertyName),
              (this.currentCollection[this.currentPropertyName] = e),
              this._propertyNameStack.pop());
      }
    }
    (t.Writer = e),
      (function (e) {
        var n;
        ((n = e.State || (e.State = {}))[(n.None = 0)] = "None"),
          (n[(n.Object = 1)] = "Object"),
          (n[(n.Array = 2)] = "Array"),
          (n[(n.Property = 3)] = "Property"),
          (n[(n.PropertyName = 4)] = "PropertyName"),
          (n[(n.String = 5)] = "String");
        e.StateElement = class {
          constructor(e) {
            (this.type = t.Writer.State.None),
              (this.childCount = 0),
              (this.type = e);
          }
        };
      })((e = t.Writer || (t.Writer = {})));
  })(X || (X = {}));
  class $ {
    constructor() {
      let t = arguments[0],
        e = arguments[1];
      if (((this.name = t), (this.callStack = new U(e)), arguments[2])) {
        let t = arguments[2];
        this.callStack.SetJsonToken(t.callstack, e),
          (this.outputStream = q.JArrayToRuntimeObjList(t.outputStream)),
          (this.currentChoices = q.JArrayToRuntimeObjList(t.currentChoices));
        let n = t.choiceThreads;
        void 0 !== n && this.LoadFlowChoiceThreads(n, e);
      } else (this.outputStream = []), (this.currentChoices = []);
    }
    WriteJson(t) {
      t.WriteObjectStart(),
        t.WriteProperty("callstack", (t) => this.callStack.WriteJson(t)),
        t.WriteProperty("outputStream", (t) =>
          q.WriteListRuntimeObjs(t, this.outputStream)
        );
      let e = !1;
      for (let n of this.currentChoices) {
        if (null === n.threadAtGeneration) return p("c.threadAtGeneration");
        (n.originalThreadIndex = n.threadAtGeneration.threadIndex),
          null === this.callStack.ThreadWithIndex(n.originalThreadIndex) &&
            (e ||
              ((e = !0),
              t.WritePropertyStart("choiceThreads"),
              t.WriteObjectStart()),
            t.WritePropertyStart(n.originalThreadIndex),
            n.threadAtGeneration.WriteJson(t),
            t.WritePropertyEnd());
      }
      e && (t.WriteObjectEnd(), t.WritePropertyEnd()),
        t.WriteProperty("currentChoices", (t) => {
          t.WriteArrayStart();
          for (let e of this.currentChoices) q.WriteChoice(t, e);
          t.WriteArrayEnd();
        }),
        t.WriteObjectEnd();
    }
    LoadFlowChoiceThreads(t, e) {
      for (let n of this.currentChoices) {
        let i = this.callStack.ThreadWithIndex(n.originalThreadIndex);
        if (null !== i) n.threadAtGeneration = i.Copy();
        else {
          let i = t["" + n.originalThreadIndex];
          n.threadAtGeneration = new U.Thread(i, e);
        }
      }
    }
  }
  class Y {
    constructor(t) {
      (this.kInkSaveStateVersion = 9),
        (this.kMinCompatibleLoadVersion = 8),
        (this.onDidLoadState = null),
        (this._currentErrors = null),
        (this._currentWarnings = null),
        (this.divertedPointer = F.Null),
        (this._currentTurnIndex = 0),
        (this.storySeed = 0),
        (this.previousRandom = 0),
        (this.didSafeExit = !1),
        (this._currentText = null),
        (this._currentTags = null),
        (this._outputStreamTextDirty = !0),
        (this._outputStreamTagsDirty = !0),
        (this._patch = null),
        (this._namedFlows = null),
        (this.kDefaultFlowName = "DEFAULT_FLOW"),
        (this.story = t),
        (this._currentFlow = new $(this.kDefaultFlowName, t)),
        this.OutputStreamDirty(),
        (this._evaluationStack = []),
        (this._variablesState = new K(this.callStack, t.listDefinitions)),
        (this._visitCounts = new Map()),
        (this._turnIndices = new Map()),
        (this.currentTurnIndex = -1);
      let e = new Date().getTime();
      (this.storySeed = new z(e).next() % 100),
        (this.previousRandom = 0),
        this.GoToStart();
    }
    ToJson(t = !1) {
      let e = new X.Writer();
      return this.WriteJson(e), e.ToString();
    }
    toJson(t = !1) {
      return this.ToJson(t);
    }
    LoadJson(t) {
      let e = X.TextToDictionary(t);
      this.LoadJsonObj(e),
        null !== this.onDidLoadState && this.onDidLoadState();
    }
    VisitCountAtPathString(t) {
      let n;
      if (null !== this._patch) {
        let i = this.story.ContentAtPath(new e(t)).container;
        if (null === i) throw new Error("Content at path not found: " + t);
        if (((n = this._patch.TryGetVisitCount(i, 0)), n.exists))
          return n.result;
      }
      return (n = C(this._visitCounts, t, null)), n.exists ? n.result : 0;
    }
    VisitCountForContainer(t) {
      if (null === t) return p("container");
      if (!t.visitsShouldBeCounted)
        return (
          this.story.Error(
            "Read count for target (" +
              t.name +
              " - on " +
              t.debugMetadata +
              ") unknown. The story may need to be compiled with countAllVisits flag (-c)."
          ),
          0
        );
      if (null !== this._patch) {
        let e = this._patch.TryGetVisitCount(t, 0);
        if (e.exists) return e.result;
      }
      let e = t.path.toString(),
        n = C(this._visitCounts, e, null);
      return n.exists ? n.result : 0;
    }
    IncrementVisitCountForContainer(t) {
      if (null !== this._patch) {
        let e = this.VisitCountForContainer(t);
        return e++, void this._patch.SetVisitCount(t, e);
      }
      let e = t.path.toString(),
        n = C(this._visitCounts, e, null);
      n.exists
        ? this._visitCounts.set(e, n.result + 1)
        : this._visitCounts.set(e, 1);
    }
    RecordTurnIndexVisitToContainer(t) {
      if (null !== this._patch)
        return void this._patch.SetTurnIndex(t, this.currentTurnIndex);
      let e = t.path.toString();
      this._turnIndices.set(e, this.currentTurnIndex);
    }
    TurnsSinceForContainer(t) {
      if (
        (t.turnIndexShouldBeCounted ||
          this.story.Error(
            "TURNS_SINCE() for target (" +
              t.name +
              " - on " +
              t.debugMetadata +
              ") unknown. The story may need to be compiled with countAllVisits flag (-c)."
          ),
        null !== this._patch)
      ) {
        let e = this._patch.TryGetTurnIndex(t, 0);
        if (e.exists) return this.currentTurnIndex - e.result;
      }
      let e = t.path.toString(),
        n = C(this._turnIndices, e, 0);
      return n.exists ? this.currentTurnIndex - n.result : -1;
    }
    get callstackDepth() {
      return this.callStack.depth;
    }
    get outputStream() {
      return this._currentFlow.outputStream;
    }
    get currentChoices() {
      return this.canContinue ? [] : this._currentFlow.currentChoices;
    }
    get generatedChoices() {
      return this._currentFlow.currentChoices;
    }
    get currentErrors() {
      return this._currentErrors;
    }
    get currentWarnings() {
      return this._currentWarnings;
    }
    get variablesState() {
      return this._variablesState;
    }
    set variablesState(t) {
      this._variablesState = t;
    }
    get callStack() {
      return this._currentFlow.callStack;
    }
    get evaluationStack() {
      return this._evaluationStack;
    }
    get currentTurnIndex() {
      return this._currentTurnIndex;
    }
    set currentTurnIndex(t) {
      this._currentTurnIndex = t;
    }
    get currentPathString() {
      let t = this.currentPointer;
      return t.isNull
        ? null
        : null === t.path
        ? p("pointer.path")
        : t.path.toString();
    }
    get currentPointer() {
      return this.callStack.currentElement.currentPointer.copy();
    }
    set currentPointer(t) {
      this.callStack.currentElement.currentPointer = t.copy();
    }
    get previousPointer() {
      return this.callStack.currentThread.previousPointer.copy();
    }
    set previousPointer(t) {
      this.callStack.currentThread.previousPointer = t.copy();
    }
    get canContinue() {
      return !this.currentPointer.isNull && !this.hasError;
    }
    get hasError() {
      return null != this.currentErrors && this.currentErrors.length > 0;
    }
    get hasWarning() {
      return null != this.currentWarnings && this.currentWarnings.length > 0;
    }
    get currentText() {
      if (this._outputStreamTextDirty) {
        let t = new f();
        for (let e of this.outputStream) {
          let n = s(e, E);
          null !== n && t.Append(n.value);
        }
        (this._currentText = this.CleanOutputWhitespace(t.toString())),
          (this._outputStreamTextDirty = !1);
      }
      return this._currentText;
    }
    CleanOutputWhitespace(t) {
      let e = new f(),
        n = -1,
        i = 0;
      for (let r = 0; r < t.length; r++) {
        let a = t.charAt(r),
          s = " " == a || "\t" == a;
        s && -1 == n && (n = r),
          s || ("\n" != a && n > 0 && n != i && e.Append(" "), (n = -1)),
          "\n" == a && (i = r + 1),
          s || e.Append(a);
      }
      return e.toString();
    }
    get currentTags() {
      if (this._outputStreamTagsDirty) {
        this._currentTags = [];
        for (let t of this.outputStream) {
          let e = s(t, B);
          null !== e && this._currentTags.push(e.text);
        }
        this._outputStreamTagsDirty = !1;
      }
      return this._currentTags;
    }
    get currentFlowName() {
      return this._currentFlow.name;
    }
    get inExpressionEvaluation() {
      return this.callStack.currentElement.inExpressionEvaluation;
    }
    set inExpressionEvaluation(t) {
      this.callStack.currentElement.inExpressionEvaluation = t;
    }
    GoToStart() {
      this.callStack.currentElement.currentPointer = F.StartOf(
        this.story.mainContentContainer
      );
    }
    SwitchFlow_Internal(t) {
      if (null === t)
        throw new Error("Must pass a non-null string to Story.SwitchFlow");
      if (
        (null === this._namedFlows &&
          ((this._namedFlows = new Map()),
          this._namedFlows.set(this.kDefaultFlowName, this._currentFlow)),
        t === this._currentFlow.name)
      )
        return;
      let e,
        n = C(this._namedFlows, t, null);
      n.exists
        ? (e = n.result)
        : ((e = new $(t, this.story)), this._namedFlows.set(t, e)),
        (this._currentFlow = e),
        (this.variablesState.callStack = this._currentFlow.callStack),
        this.OutputStreamDirty();
    }
    SwitchToDefaultFlow_Internal() {
      null !== this._namedFlows &&
        this.SwitchFlow_Internal(this.kDefaultFlowName);
    }
    RemoveFlow_Internal(t) {
      if (null === t)
        throw new Error("Must pass a non-null string to Story.DestroyFlow");
      if (t === this.kDefaultFlowName)
        throw new Error("Cannot destroy default flow");
      if (
        (this._currentFlow.name === t && this.SwitchToDefaultFlow_Internal(),
        null === this._namedFlows)
      )
        return p("this._namedFlows");
      this._namedFlows.delete(t);
    }
    CopyAndStartPatching() {
      let t = new Y(this.story);
      if (
        ((t._patch = new H(this._patch)),
        (t._currentFlow.name = this._currentFlow.name),
        (t._currentFlow.callStack = new U(this._currentFlow.callStack)),
        t._currentFlow.currentChoices.push(...this._currentFlow.currentChoices),
        t._currentFlow.outputStream.push(...this._currentFlow.outputStream),
        t.OutputStreamDirty(),
        null !== this._namedFlows)
      ) {
        t._namedFlows = new Map();
        for (let [e, n] of this._namedFlows) t._namedFlows.set(e, n);
        t._namedFlows.set(this._currentFlow.name, t._currentFlow);
      }
      return (
        this.hasError &&
          ((t._currentErrors = []),
          t._currentErrors.push(...(this.currentErrors || []))),
        this.hasWarning &&
          ((t._currentWarnings = []),
          t._currentWarnings.push(...(this.currentWarnings || []))),
        (t.variablesState = this.variablesState),
        (t.variablesState.callStack = t.callStack),
        (t.variablesState.patch = t._patch),
        t.evaluationStack.push(...this.evaluationStack),
        this.divertedPointer.isNull ||
          (t.divertedPointer = this.divertedPointer.copy()),
        (t.previousPointer = this.previousPointer.copy()),
        (t._visitCounts = this._visitCounts),
        (t._turnIndices = this._turnIndices),
        (t.currentTurnIndex = this.currentTurnIndex),
        (t.storySeed = this.storySeed),
        (t.previousRandom = this.previousRandom),
        (t.didSafeExit = this.didSafeExit),
        t
      );
    }
    RestoreAfterPatch() {
      (this.variablesState.callStack = this.callStack),
        (this.variablesState.patch = this._patch);
    }
    ApplyAnyPatch() {
      if (null !== this._patch) {
        this.variablesState.ApplyPatch();
        for (let [t, e] of this._patch.visitCounts)
          this.ApplyCountChanges(t, e, !0);
        for (let [t, e] of this._patch.turnIndices)
          this.ApplyCountChanges(t, e, !1);
        this._patch = null;
      }
    }
    ApplyCountChanges(t, e, n) {
      (n ? this._visitCounts : this._turnIndices).set(t.path.toString(), e);
    }
    WriteJson(t) {
      if (
        (t.WriteObjectStart(),
        t.WritePropertyStart("flows"),
        t.WriteObjectStart(),
        null !== this._namedFlows)
      )
        for (let [e, n] of this._namedFlows)
          t.WriteProperty(e, (t) => n.WriteJson(t));
      else
        t.WriteProperty(this._currentFlow.name, (t) =>
          this._currentFlow.WriteJson(t)
        );
      if (
        (t.WriteObjectEnd(),
        t.WritePropertyEnd(),
        t.WriteProperty("currentFlowName", this._currentFlow.name),
        t.WriteProperty("variablesState", (t) =>
          this.variablesState.WriteJson(t)
        ),
        t.WriteProperty("evalStack", (t) =>
          q.WriteListRuntimeObjs(t, this.evaluationStack)
        ),
        !this.divertedPointer.isNull)
      ) {
        if (null === this.divertedPointer.path) return p("divertedPointer");
        t.WriteProperty(
          "currentDivertTarget",
          this.divertedPointer.path.componentsString
        );
      }
      t.WriteProperty("visitCounts", (t) =>
        q.WriteIntDictionary(t, this._visitCounts)
      ),
        t.WriteProperty("turnIndices", (t) =>
          q.WriteIntDictionary(t, this._turnIndices)
        ),
        t.WriteIntProperty("turnIdx", this.currentTurnIndex),
        t.WriteIntProperty("storySeed", this.storySeed),
        t.WriteIntProperty("previousRandom", this.previousRandom),
        t.WriteIntProperty("inkSaveVersion", this.kInkSaveStateVersion),
        t.WriteIntProperty("inkFormatVersion", Z.inkVersionCurrent),
        t.WriteObjectEnd();
    }
    LoadJsonObj(t) {
      let n = t,
        i = n.inkSaveVersion;
      if (null == i) throw new Error("ink save format incorrect, can't load.");
      if (parseInt(i) < this.kMinCompatibleLoadVersion)
        throw new Error(
          "Ink save format isn't compatible with the current version (saw '" +
            i +
            "', but minimum is " +
            this.kMinCompatibleLoadVersion +
            "), so can't load."
        );
      let r = n.flows;
      if (null != r) {
        let t = r;
        1 === Object.keys(t).length
          ? (this._namedFlows = null)
          : null === this._namedFlows
          ? (this._namedFlows = new Map())
          : this._namedFlows.clear();
        let e = Object.entries(t);
        for (let [n, i] of e) {
          let e = n,
            r = i,
            a = new $(e, this.story, r);
          if (1 === Object.keys(t).length)
            this._currentFlow = new $(e, this.story, r);
          else {
            if (null === this._namedFlows) return p("this._namedFlows");
            this._namedFlows.set(e, a);
          }
        }
        if (null != this._namedFlows && this._namedFlows.size > 1) {
          let t = n.currentFlowName;
          this._currentFlow = this._namedFlows.get(t);
        }
      } else {
        (this._namedFlows = null),
          (this._currentFlow.name = this.kDefaultFlowName),
          this._currentFlow.callStack.SetJsonToken(
            n.callstackThreads,
            this.story
          ),
          (this._currentFlow.outputStream = q.JArrayToRuntimeObjList(
            n.outputStream
          )),
          (this._currentFlow.currentChoices = q.JArrayToRuntimeObjList(
            n.currentChoices
          ));
        let t = n.choiceThreads;
        this._currentFlow.LoadFlowChoiceThreads(t, this.story);
      }
      this.OutputStreamDirty(),
        this.variablesState.SetJsonToken(n.variablesState),
        (this.variablesState.callStack = this._currentFlow.callStack),
        (this._evaluationStack = q.JArrayToRuntimeObjList(n.evalStack));
      let a = n.currentDivertTarget;
      if (null != a) {
        let t = new e(a.toString());
        this.divertedPointer = this.story.PointerAtPath(t);
      }
      (this._visitCounts = q.JObjectToIntDictionary(n.visitCounts)),
        (this._turnIndices = q.JObjectToIntDictionary(n.turnIndices)),
        (this.currentTurnIndex = parseInt(n.turnIdx)),
        (this.storySeed = parseInt(n.storySeed)),
        (this.previousRandom = parseInt(n.previousRandom));
    }
    ResetErrors() {
      (this._currentErrors = null), (this._currentWarnings = null);
    }
    ResetOutput(t = null) {
      (this.outputStream.length = 0),
        null !== t && this.outputStream.push(...t),
        this.OutputStreamDirty();
    }
    PushToOutputStream(t) {
      let e = s(t, E);
      if (null !== e) {
        let t = this.TrySplittingHeadTailWhitespace(e);
        if (null !== t) {
          for (let e of t) this.PushToOutputStreamIndividual(e);
          return void this.OutputStreamDirty();
        }
      }
      this.PushToOutputStreamIndividual(t), this.OutputStreamDirty();
    }
    PopFromOutputStream(t) {
      this.outputStream.splice(this.outputStream.length - t, t),
        this.OutputStreamDirty();
    }
    TrySplittingHeadTailWhitespace(t) {
      let e = t.value;
      if (null === e) return p("single.value");
      let n = -1,
        i = -1;
      for (let t = 0; t < e.length; t++) {
        let r = e[t];
        if ("\n" != r) {
          if (" " == r || "\t" == r) continue;
          break;
        }
        -1 == n && (n = t), (i = t);
      }
      let r = -1,
        a = -1;
      for (let t = e.length - 1; t >= 0; t--) {
        let n = e[t];
        if ("\n" != n) {
          if (" " == n || "\t" == n) continue;
          break;
        }
        -1 == r && (r = t), (a = t);
      }
      if (-1 == n && -1 == r) return null;
      let s = [],
        l = 0,
        o = e.length;
      if (-1 != n) {
        if (n > 0) {
          let t = new E(e.substring(0, n));
          s.push(t);
        }
        s.push(new E("\n")), (l = i + 1);
      }
      if ((-1 != r && (o = a), o > l)) {
        let t = e.substring(l, o - l);
        s.push(new E(t));
      }
      if (-1 != r && a > i && (s.push(new E("\n")), r < e.length - 1)) {
        let t = e.length - r - 1,
          n = new E(e.substring(r + 1, t));
        s.push(n);
      }
      return s;
    }
    PushToOutputStreamIndividual(t) {
      let e = s(t, I),
        n = s(t, E),
        i = !0;
      if (e) this.TrimNewlinesFromOutputStream(), (i = !0);
      else if (n) {
        let t = -1,
          e = this.callStack.currentElement;
        e.type == r.Function && (t = e.functionStartInOutputStream);
        let a = -1;
        for (let e = this.outputStream.length - 1; e >= 0; e--) {
          let n = this.outputStream[e],
            i = n instanceof k ? n : null;
          if (null != (n instanceof I ? n : null)) {
            a = e;
            break;
          }
          if (null != i && i.commandType == k.CommandType.BeginString) {
            e >= t && (t = -1);
            break;
          }
        }
        let s = -1;
        if (
          ((s = -1 != a && -1 != t ? Math.min(t, a) : -1 != a ? a : t), -1 != s)
        ) {
          if (n.isNewline) i = !1;
          else if (
            n.isNonWhitespace &&
            (a > -1 && this.RemoveExistingGlue(), t > -1)
          ) {
            let t = this.callStack.elements;
            for (let e = t.length - 1; e >= 0; e--) {
              let n = t[e];
              if (n.type != r.Function) break;
              n.functionStartInOutputStream = -1;
            }
          }
        } else
          n.isNewline &&
            ((!this.outputStreamEndsInNewline &&
              this.outputStreamContainsContent) ||
              (i = !1));
      }
      if (i) {
        if (null === t) return p("obj");
        this.outputStream.push(t), this.OutputStreamDirty();
      }
    }
    TrimNewlinesFromOutputStream() {
      let t = -1,
        e = this.outputStream.length - 1;
      for (; e >= 0; ) {
        let n = this.outputStream[e],
          i = s(n, k),
          r = s(n, E);
        if (null != i || (null != r && r.isNonWhitespace)) break;
        null != r && r.isNewline && (t = e), e--;
      }
      if (t >= 0)
        for (e = t; e < this.outputStream.length; ) {
          s(this.outputStream[e], E) ? this.outputStream.splice(e, 1) : e++;
        }
      this.OutputStreamDirty();
    }
    RemoveExistingGlue() {
      for (let t = this.outputStream.length - 1; t >= 0; t--) {
        let e = this.outputStream[t];
        if (e instanceof I) this.outputStream.splice(t, 1);
        else if (e instanceof k) break;
      }
      this.OutputStreamDirty();
    }
    get outputStreamEndsInNewline() {
      if (this.outputStream.length > 0)
        for (let t = this.outputStream.length - 1; t >= 0; t--) {
          if (this.outputStream[t] instanceof k) break;
          let e = this.outputStream[t];
          if (e instanceof E) {
            if (e.isNewline) return !0;
            if (e.isNonWhitespace) break;
          }
        }
      return !1;
    }
    get outputStreamContainsContent() {
      for (let t of this.outputStream) if (t instanceof E) return !0;
      return !1;
    }
    get inStringEvaluation() {
      for (let t = this.outputStream.length - 1; t >= 0; t--) {
        let e = s(this.outputStream[t], k);
        if (e instanceof k && e.commandType == k.CommandType.BeginString)
          return !0;
      }
      return !1;
    }
    PushEvaluationStack(t) {
      let e = s(t, N);
      if (e) {
        let t = e.value;
        if (null === t) return p("rawList");
        if (null != t.originNames) {
          t.origins || (t.origins = []), (t.origins.length = 0);
          for (let e of t.originNames) {
            if (null === this.story.listDefinitions)
              return p("StoryState.story.listDefinitions");
            let n = this.story.listDefinitions.TryListGetDefinition(e, null);
            if (null === n.result) return p("StoryState def.result");
            t.origins.indexOf(n.result) < 0 && t.origins.push(n.result);
          }
        }
      }
      if (null === t) return p("obj");
      this.evaluationStack.push(t);
    }
    PopEvaluationStack(t) {
      if (void 0 === t) {
        return u(this.evaluationStack.pop());
      }
      if (t > this.evaluationStack.length)
        throw new Error("trying to pop too many objects");
      return u(this.evaluationStack.splice(this.evaluationStack.length - t, t));
    }
    PeekEvaluationStack() {
      return this.evaluationStack[this.evaluationStack.length - 1];
    }
    ForceEnd() {
      this.callStack.Reset(),
        (this._currentFlow.currentChoices.length = 0),
        (this.currentPointer = F.Null),
        (this.previousPointer = F.Null),
        (this.didSafeExit = !0);
    }
    TrimWhitespaceFromFunctionEnd() {
      n.Assert(this.callStack.currentElement.type == r.Function);
      let t = this.callStack.currentElement.functionStartInOutputStream;
      -1 == t && (t = 0);
      for (let e = this.outputStream.length - 1; e >= t; e--) {
        let t = this.outputStream[e],
          n = s(t, E),
          i = s(t, k);
        if (null != n) {
          if (i) break;
          if (!n.isNewline && !n.isInlineWhitespace) break;
          this.outputStream.splice(e, 1), this.OutputStreamDirty();
        }
      }
    }
    PopCallStack(t = null) {
      this.callStack.currentElement.type == r.Function &&
        this.TrimWhitespaceFromFunctionEnd(),
        this.callStack.Pop(t);
    }
    SetChosenPath(t, e) {
      this._currentFlow.currentChoices.length = 0;
      let n = this.story.PointerAtPath(t);
      n.isNull || -1 != n.index || (n.index = 0),
        (this.currentPointer = n),
        e && this.currentTurnIndex++;
    }
    StartFunctionEvaluationFromGame(t, e) {
      this.callStack.Push(
        r.FunctionEvaluationFromGame,
        this.evaluationStack.length
      ),
        (this.callStack.currentElement.currentPointer = F.StartOf(t)),
        this.PassArgumentsToEvaluationStack(e);
    }
    PassArgumentsToEvaluationStack(t) {
      if (null !== t)
        for (let e = 0; e < t.length; e++) {
          if (
            ("number" != typeof t[e] && "string" != typeof t[e]) ||
            t[e] instanceof S
          )
            throw new Error((u(arguments[e]), "null"));
          this.PushEvaluationStack(b.Create(t[e]));
        }
    }
    TryExitFunctionEvaluationFromGame() {
      return (
        this.callStack.currentElement.type == r.FunctionEvaluationFromGame &&
        ((this.currentPointer = F.Null), (this.didSafeExit = !0), !0)
      );
    }
    CompleteFunctionEvaluationFromGame() {
      if (this.callStack.currentElement.type != r.FunctionEvaluationFromGame)
        throw new Error(
          "Expected external function evaluation to be complete. Stack trace: " +
            this.callStack.callStackTrace
        );
      let t = this.callStack.currentElement.evaluationStackHeightWhenPushed,
        e = null;
      for (; this.evaluationStack.length > t; ) {
        let t = this.PopEvaluationStack();
        null === e && (e = t);
      }
      if ((this.PopCallStack(r.FunctionEvaluationFromGame), e)) {
        if (e instanceof j) return null;
        let t = l(e, b);
        return t.valueType == i.DivertTarget
          ? t.valueObject.toString()
          : t.valueObject;
      }
      return null;
    }
    AddError(t, e) {
      e
        ? (null == this._currentWarnings && (this._currentWarnings = []),
          this._currentWarnings.push(t))
        : (null == this._currentErrors && (this._currentErrors = []),
          this._currentErrors.push(t));
    }
    OutputStreamDirty() {
      (this._outputStreamTextDirty = !0), (this._outputStreamTagsDirty = !0);
    }
  }
  class Q {
    constructor() {
      this.startTime = void 0;
    }
    get ElapsedMilliseconds() {
      return void 0 === this.startTime
        ? 0
        : new Date().getTime() - this.startTime;
    }
    Start() {
      this.startTime = new Date().getTime();
    }
    Stop() {
      this.startTime = void 0;
    }
  }
  !(function (t) {
    (t[(t.Author = 0)] = "Author"),
      (t[(t.Warning = 1)] = "Warning"),
      (t[(t.Error = 2)] = "Error");
  })(a || (a = {})),
    Number.isInteger ||
      (Number.isInteger = function (t) {
        return (
          "number" == typeof t &&
          isFinite(t) &&
          t > -9007199254740992 &&
          t < 9007199254740992 &&
          Math.floor(t) === t
        );
      });
  class Z extends m {
    constructor() {
      let t;
      super(),
        (this.inkVersionMinimumCompatible = 18),
        (this.onError = null),
        (this.onDidContinue = null),
        (this.onMakeChoice = null),
        (this.onEvaluateFunction = null),
        (this.onCompleteEvaluateFunction = null),
        (this.onChoosePathString = null),
        (this._prevContainers = []),
        (this.allowExternalFunctionFallbacks = !1),
        (this._listDefinitions = null),
        (this._variableObservers = null),
        (this._hasValidatedExternals = !1),
        (this._temporaryEvaluationContainer = null),
        (this._asyncContinueActive = !1),
        (this._stateSnapshotAtLastNewline = null),
        (this._sawLookaheadUnsafeFunctionAfterNewline = !1),
        (this._recursiveContinueCount = 0),
        (this._asyncSaving = !1),
        (this._profiler = null);
      let e = null,
        n = null;
      if (arguments[0] instanceof x)
        (t = arguments[0]),
          void 0 !== arguments[1] && (e = arguments[1]),
          (this._mainContentContainer = t);
      else if ("string" == typeof arguments[0]) {
        let t = arguments[0];
        n = X.TextToDictionary(t);
      } else n = arguments[0];
      if (
        (null != e && (this._listDefinitions = new J(e)),
        (this._externals = new Map()),
        null !== n)
      ) {
        let t = n,
          e = t.inkVersion;
        if (null == e)
          throw new Error(
            "ink version number not found. Are you sure it's a valid .ink.json file?"
          );
        let i = parseInt(e);
        if (i > Z.inkVersionCurrent)
          throw new Error(
            "Version of ink used to build story was newer than the current version of the engine"
          );
        if (i < this.inkVersionMinimumCompatible)
          throw new Error(
            "Version of ink used to build story is too old to be loaded by this version of the engine"
          );
        i != Z.inkVersionCurrent &&
          console.warn(
            "WARNING: Version of ink used to build story doesn't match current version of engine. Non-critical, but recommend synchronising."
          );
        let r,
          a = t.root;
        if (null == a)
          throw new Error(
            "Root node for ink not found. Are you sure it's a valid .ink.json file?"
          );
        (r = t.listDefs) &&
          (this._listDefinitions = q.JTokenToListDefinitions(r)),
          (this._mainContentContainer = l(q.JTokenToRuntimeObject(a), x)),
          this.ResetState();
      }
    }
    get currentChoices() {
      let t = [];
      if (null === this._state) return p("this._state");
      for (let e of this._state.currentChoices)
        e.isInvisibleDefault || ((e.index = t.length), t.push(e));
      return t;
    }
    get currentText() {
      return (
        this.IfAsyncWeCant("call currentText since it's a work in progress"),
        this.state.currentText
      );
    }
    get currentTags() {
      return (
        this.IfAsyncWeCant("call currentTags since it's a work in progress"),
        this.state.currentTags
      );
    }
    get currentErrors() {
      return this.state.currentErrors;
    }
    get currentWarnings() {
      return this.state.currentWarnings;
    }
    get currentFlowName() {
      return this.state.currentFlowName;
    }
    get hasError() {
      return this.state.hasError;
    }
    get hasWarning() {
      return this.state.hasWarning;
    }
    get variablesState() {
      return this.state.variablesState;
    }
    get listDefinitions() {
      return this._listDefinitions;
    }
    get state() {
      return this._state;
    }
    StartProfiling() {}
    EndProfiling() {}
    ToJson(t) {
      let e = !1;
      if (
        (t || ((e = !0), (t = new X.Writer())),
        t.WriteObjectStart(),
        t.WriteIntProperty("inkVersion", Z.inkVersionCurrent),
        t.WriteProperty("root", (t) =>
          q.WriteRuntimeContainer(t, this._mainContentContainer)
        ),
        null != this._listDefinitions)
      ) {
        t.WritePropertyStart("listDefs"), t.WriteObjectStart();
        for (let e of this._listDefinitions.lists) {
          t.WritePropertyStart(e.name), t.WriteObjectStart();
          for (let [n, i] of e.items) {
            let e = g.fromSerializedKey(n),
              r = i;
            t.WriteIntProperty(e.itemName, r);
          }
          t.WriteObjectEnd(), t.WritePropertyEnd();
        }
        t.WriteObjectEnd(), t.WritePropertyEnd();
      }
      if ((t.WriteObjectEnd(), e)) return t.ToString();
    }
    ResetState() {
      this.IfAsyncWeCant("ResetState"),
        (this._state = new Y(this)),
        this._state.variablesState.ObserveVariableChange(
          this.VariableStateDidChangeEvent.bind(this)
        ),
        this.ResetGlobals();
    }
    ResetErrors() {
      if (null === this._state) return p("this._state");
      this._state.ResetErrors();
    }
    ResetCallstack() {
      if ((this.IfAsyncWeCant("ResetCallstack"), null === this._state))
        return p("this._state");
      this._state.ForceEnd();
    }
    ResetGlobals() {
      if (this._mainContentContainer.namedContent.get("global decl")) {
        let t = this.state.currentPointer.copy();
        this.ChoosePath(new e("global decl"), !1),
          this.ContinueInternal(),
          (this.state.currentPointer = t);
      }
      this.state.variablesState.SnapshotDefaultGlobals();
    }
    SwitchFlow(t) {
      if ((this.IfAsyncWeCant("switch flow"), this._asyncSaving))
        throw new Error(
          "Story is already in background saving mode, can't switch flow to " +
            t
        );
      this.state.SwitchFlow_Internal(t);
    }
    RemoveFlow(t) {
      this.state.RemoveFlow_Internal(t);
    }
    SwitchToDefaultFlow() {
      this.state.SwitchToDefaultFlow_Internal();
    }
    Continue() {
      return this.ContinueAsync(0), this.currentText;
    }
    get canContinue() {
      return this.state.canContinue;
    }
    get asyncContinueComplete() {
      return !this._asyncContinueActive;
    }
    ContinueAsync(t) {
      this._hasValidatedExternals || this.ValidateExternalBindings(),
        this.ContinueInternal(t);
    }
    ContinueInternal(t = 0) {
      null != this._profiler && this._profiler.PreContinue();
      let e = t > 0;
      if ((this._recursiveContinueCount++, !this._asyncContinueActive)) {
        if (((this._asyncContinueActive = e), !this.canContinue))
          throw new Error(
            "Can't continue - should check canContinue before calling Continue"
          );
        (this._state.didSafeExit = !1),
          this._state.ResetOutput(),
          1 == this._recursiveContinueCount &&
            (this._state.variablesState.batchObservingVariableChanges = !0);
      }
      let n = new Q();
      n.Start();
      let i = !1;
      this._sawLookaheadUnsafeFunctionAfterNewline = !1;
      do {
        try {
          i = this.ContinueSingleStep();
        } catch (t) {
          if (!(t instanceof y)) throw t;
          this.AddError(t.message, void 0, t.useEndLineNumber);
          break;
        }
        if (i) break;
        if (this._asyncContinueActive && n.ElapsedMilliseconds > t) break;
      } while (this.canContinue);
      if (
        (n.Stop(),
        (!i && this.canContinue) ||
          (null !== this._stateSnapshotAtLastNewline &&
            this.RestoreStateSnapshot(),
          this.canContinue ||
            (this.state.callStack.canPopThread &&
              this.AddError(
                "Thread available to pop, threads should always be flat by the end of evaluation?"
              ),
            0 != this.state.generatedChoices.length ||
              this.state.didSafeExit ||
              null != this._temporaryEvaluationContainer ||
              (this.state.callStack.CanPop(r.Tunnel)
                ? this.AddError(
                    "unexpectedly reached end of content. Do you need a '->->' to return from a tunnel?"
                  )
                : this.state.callStack.CanPop(r.Function)
                ? this.AddError(
                    "unexpectedly reached end of content. Do you need a '~ return'?"
                  )
                : this.state.callStack.canPop
                ? this.AddError(
                    "unexpectedly reached end of content for unknown reason. Please debug compiler!"
                  )
                : this.AddError(
                    "ran out of content. Do you need a '-> DONE' or '-> END'?"
                  ))),
          (this.state.didSafeExit = !1),
          (this._sawLookaheadUnsafeFunctionAfterNewline = !1),
          1 == this._recursiveContinueCount &&
            (this._state.variablesState.batchObservingVariableChanges = !1),
          (this._asyncContinueActive = !1),
          null !== this.onDidContinue && this.onDidContinue()),
        this._recursiveContinueCount--,
        null != this._profiler && this._profiler.PostContinue(),
        this.state.hasError || this.state.hasWarning)
      ) {
        if (null === this.onError) {
          let t = new f();
          throw (
            (t.Append("Ink had "),
            this.state.hasError &&
              (t.Append("" + this.state.currentErrors.length),
              t.Append(
                1 == this.state.currentErrors.length ? " error" : "errors"
              ),
              this.state.hasWarning && t.Append(" and ")),
            this.state.hasWarning &&
              (t.Append("" + this.state.currentWarnings.length),
              t.Append(
                1 == this.state.currentWarnings.length ? " warning" : "warnings"
              ),
              this.state.hasWarning && t.Append(" and ")),
            t.Append(
              ". It is strongly suggested that you assign an error handler to story.onError. The first issue was: "
            ),
            t.Append(
              this.state.hasError
                ? this.state.currentErrors[0]
                : this.state.currentWarnings[0]
            ),
            new y(t.toString()))
          );
        }
        if (this.state.hasError)
          for (let t of this.state.currentErrors) this.onError(t, a.Error);
        if (this.state.hasWarning)
          for (let t of this.state.currentWarnings) this.onError(t, a.Warning);
        this.ResetErrors();
      }
    }
    ContinueSingleStep() {
      if (
        (null != this._profiler && this._profiler.PreStep(),
        this.Step(),
        null != this._profiler && this._profiler.PostStep(),
        this.canContinue ||
          this.state.callStack.elementIsEvaluateFromGame ||
          this.TryFollowDefaultInvisibleChoice(),
        null != this._profiler && this._profiler.PreSnapshot(),
        !this.state.inStringEvaluation)
      ) {
        if (null !== this._stateSnapshotAtLastNewline) {
          if (null === this._stateSnapshotAtLastNewline.currentTags)
            return p("this._stateAtLastNewline.currentTags");
          if (null === this.state.currentTags)
            return p("this.state.currentTags");
          let t = this.CalculateNewlineOutputStateChange(
            this._stateSnapshotAtLastNewline.currentText,
            this.state.currentText,
            this._stateSnapshotAtLastNewline.currentTags.length,
            this.state.currentTags.length
          );
          if (
            t == Z.OutputStateChange.ExtendedBeyondNewline ||
            this._sawLookaheadUnsafeFunctionAfterNewline
          )
            return this.RestoreStateSnapshot(), !0;
          t == Z.OutputStateChange.NewlineRemoved && this.DiscardSnapshot();
        }
        this.state.outputStreamEndsInNewline &&
          (this.canContinue
            ? null == this._stateSnapshotAtLastNewline && this.StateSnapshot()
            : this.DiscardSnapshot());
      }
      return null != this._profiler && this._profiler.PostSnapshot(), !1;
    }
    CalculateNewlineOutputStateChange(t, e, n, i) {
      if (null === t) return p("prevText");
      if (null === e) return p("currText");
      let r = e.length >= t.length && "\n" == e.charAt(t.length - 1);
      if (n == i && t.length == e.length && r)
        return Z.OutputStateChange.NoChange;
      if (!r) return Z.OutputStateChange.NewlineRemoved;
      if (i > n) return Z.OutputStateChange.ExtendedBeyondNewline;
      for (let n = t.length; n < e.length; n++) {
        let t = e.charAt(n);
        if (" " != t && "\t" != t)
          return Z.OutputStateChange.ExtendedBeyondNewline;
      }
      return Z.OutputStateChange.NoChange;
    }
    ContinueMaximally() {
      this.IfAsyncWeCant("ContinueMaximally");
      let t = new f();
      for (; this.canContinue; ) t.Append(this.Continue());
      return t.toString();
    }
    ContentAtPath(t) {
      return this.mainContentContainer.ContentAtPath(t);
    }
    KnotContainerWithName(t) {
      let e = this.mainContentContainer.namedContent.get(t);
      return e instanceof x ? e : null;
    }
    PointerAtPath(t) {
      if (0 == t.length) return F.Null;
      let e = new F(),
        n = t.length,
        i = null;
      return null === t.lastComponent
        ? p("path.lastComponent")
        : (t.lastComponent.isIndex
            ? ((n = t.length - 1),
              (i = this.mainContentContainer.ContentAtPath(t, void 0, n)),
              (e.container = i.container),
              (e.index = t.lastComponent.index))
            : ((i = this.mainContentContainer.ContentAtPath(t)),
              (e.container = i.container),
              (e.index = -1)),
          null == i.obj || (i.obj == this.mainContentContainer && n > 0)
            ? this.Error(
                "Failed to find content at path '" +
                  t +
                  "', and no approximation of it was possible."
              )
            : i.approximate &&
              this.Warning(
                "Failed to find content at path '" +
                  t +
                  "', so it was approximated to: '" +
                  i.obj.path +
                  "'."
              ),
          e);
    }
    StateSnapshot() {
      (this._stateSnapshotAtLastNewline = this._state),
        (this._state = this._state.CopyAndStartPatching());
    }
    RestoreStateSnapshot() {
      null === this._stateSnapshotAtLastNewline &&
        p("_stateSnapshotAtLastNewline"),
        this._stateSnapshotAtLastNewline.RestoreAfterPatch(),
        (this._state = this._stateSnapshotAtLastNewline),
        (this._stateSnapshotAtLastNewline = null),
        this._asyncSaving || this._state.ApplyAnyPatch();
    }
    DiscardSnapshot() {
      this._asyncSaving || this._state.ApplyAnyPatch(),
        (this._stateSnapshotAtLastNewline = null);
    }
    CopyStateForBackgroundThreadSave() {
      if (
        (this.IfAsyncWeCant("start saving on a background thread"),
        this._asyncSaving)
      )
        throw new Error(
          "Story is already in background saving mode, can't call CopyStateForBackgroundThreadSave again!"
        );
      let t = this._state;
      return (
        (this._state = this._state.CopyAndStartPatching()),
        (this._asyncSaving = !0),
        t
      );
    }
    BackgroundSaveComplete() {
      null === this._stateSnapshotAtLastNewline && this._state.ApplyAnyPatch(),
        (this._asyncSaving = !1);
    }
    Step() {
      let t = !0,
        e = this.state.currentPointer.copy();
      if (e.isNull) return;
      let n = s(e.Resolve(), x);
      for (; n && (this.VisitContainer(n, !0), 0 != n.content.length); )
        (e = F.StartOf(n)), (n = s(e.Resolve(), x));
      (this.state.currentPointer = e.copy()),
        null != this._profiler && this._profiler.Step(this.state.callStack);
      let i = e.Resolve(),
        r = this.PerformLogicAndFlowControl(i);
      if (this.state.currentPointer.isNull) return;
      r && (t = !1);
      let a = s(i, V);
      if (a) {
        let e = this.ProcessChoice(a);
        e && this.state.generatedChoices.push(e), (i = null), (t = !1);
      }
      if ((i instanceof x && (t = !1), t)) {
        let t = s(i, O);
        if (t && -1 == t.contextIndex) {
          let e = this.state.callStack.ContextForVariableNamed(t.variableName);
          i = new O(t.variableName, e);
        }
        this.state.inExpressionEvaluation
          ? this.state.PushEvaluationStack(i)
          : this.state.PushToOutputStream(i);
      }
      this.NextContent();
      let l = s(i, k);
      l &&
        l.commandType == k.CommandType.StartThread &&
        this.state.callStack.PushThread();
    }
    VisitContainer(t, e) {
      (t.countingAtStartOnly && !e) ||
        (t.visitsShouldBeCounted &&
          this.state.IncrementVisitCountForContainer(t),
        t.turnIndexShouldBeCounted &&
          this.state.RecordTurnIndexVisitToContainer(t));
    }
    VisitChangedContainersDueToDivert() {
      let t = this.state.previousPointer.copy(),
        e = this.state.currentPointer.copy();
      if (e.isNull || -1 == e.index) return;
      if (((this._prevContainers.length = 0), !t.isNull)) {
        let e = s(t.Resolve(), x) || s(t.container, x);
        for (; e; ) this._prevContainers.push(e), (e = s(e.parent, x));
      }
      let n = e.Resolve();
      if (null == n) return;
      let i = s(n.parent, x),
        r = !0;
      for (
        ;
        i && (this._prevContainers.indexOf(i) < 0 || i.countingAtStartOnly);

      ) {
        let t = i.content.length > 0 && n == i.content[0] && r;
        t || (r = !1), this.VisitContainer(i, t), (n = i), (i = s(i.parent, x));
      }
    }
    ProcessChoice(t) {
      let e = !0;
      if (t.hasCondition) {
        let t = this.state.PopEvaluationStack();
        this.IsTruthy(t) || (e = !1);
      }
      let n = "",
        i = "";
      if (t.hasChoiceOnlyContent) {
        i = l(this.state.PopEvaluationStack(), E).value || "";
      }
      if (t.hasStartContent) {
        n = l(this.state.PopEvaluationStack(), E).value || "";
      }
      if (t.onceOnly) {
        this.state.VisitCountForContainer(t.choiceTarget) > 0 && (e = !1);
      }
      if (!e) return null;
      let r = new G();
      return (
        (r.targetPath = t.pathOnChoice),
        (r.sourcePath = t.path.toString()),
        (r.isInvisibleDefault = t.isInvisibleDefault),
        (r.threadAtGeneration = this.state.callStack.ForkThread()),
        (r.text = (n + i).replace(/^[ \t]+|[ \t]+$/g, "")),
        r
      );
    }
    IsTruthy(t) {
      if (t instanceof b) {
        let e = t;
        if (e instanceof P) {
          let t = e;
          return (
            this.Error(
              "Shouldn't use a divert target (to " +
                t.targetPath +
                ") as a conditional value. Did you intend a function call 'likeThis()' or a read count check 'likeThis'? (no arrows)"
            ),
            !1
          );
        }
        return e.isTruthy;
      }
      return !1;
    }
    PerformLogicAndFlowControl(t) {
      if (null == t) return !1;
      if (t instanceof W) {
        let e = t;
        if (e.isConditional) {
          let t = this.state.PopEvaluationStack();
          if (!this.IsTruthy(t)) return !0;
        }
        if (e.hasVariableTarget) {
          let t = e.variableDivertName,
            n = this.state.variablesState.GetVariableWithName(t);
          if (null == n)
            this.Error(
              "Tried to divert using a target from a variable that could not be found (" +
                t +
                ")"
            );
          else if (!(n instanceof P)) {
            let e = s(n, w),
              i =
                "Tried to divert to a target from a variable, but the variable (" +
                t +
                ") didn't contain a divert target, it ";
            e instanceof w && 0 == e.value
              ? (i += "was empty/null (the value 0).")
              : (i += "contained '" + n + "'."),
              this.Error(i);
          }
          let i = l(n, P);
          this.state.divertedPointer = this.PointerAtPath(i.targetPath);
        } else {
          if (e.isExternal)
            return (
              this.CallExternalFunction(e.targetPathString, e.externalArgs), !0
            );
          this.state.divertedPointer = e.targetPointer.copy();
        }
        return (
          e.pushesToStack &&
            this.state.callStack.Push(
              e.stackPushType,
              void 0,
              this.state.outputStream.length
            ),
          this.state.divertedPointer.isNull &&
            !e.isExternal &&
            (e && e.debugMetadata && null != e.debugMetadata.sourceName
              ? this.Error(
                  "Divert target doesn't exist: " + e.debugMetadata.sourceName
                )
              : this.Error("Divert resolution failed: " + e)),
          !0
        );
      }
      if (t instanceof k) {
        let e = t;
        switch (e.commandType) {
          case k.CommandType.EvalStart:
            this.Assert(
              !1 === this.state.inExpressionEvaluation,
              "Already in expression evaluation?"
            ),
              (this.state.inExpressionEvaluation = !0);
            break;
          case k.CommandType.EvalEnd:
            this.Assert(
              !0 === this.state.inExpressionEvaluation,
              "Not in expression evaluation mode"
            ),
              (this.state.inExpressionEvaluation = !1);
            break;
          case k.CommandType.EvalOutput:
            if (this.state.evaluationStack.length > 0) {
              let t = this.state.PopEvaluationStack();
              if (!(t instanceof j)) {
                let e = new E(t.toString());
                this.state.PushToOutputStream(e);
              }
            }
            break;
          case k.CommandType.NoOp:
            break;
          case k.CommandType.Duplicate:
            this.state.PushEvaluationStack(this.state.PeekEvaluationStack());
            break;
          case k.CommandType.PopEvaluatedValue:
            this.state.PopEvaluationStack();
            break;
          case k.CommandType.PopFunction:
          case k.CommandType.PopTunnel:
            let t =
                e.commandType == k.CommandType.PopFunction
                  ? r.Function
                  : r.Tunnel,
              n = null;
            if (t == r.Tunnel) {
              let t = this.state.PopEvaluationStack();
              (n = s(t, P)),
                null === n &&
                  this.Assert(
                    t instanceof j,
                    "Expected void if ->-> doesn't override target"
                  );
            }
            if (this.state.TryExitFunctionEvaluationFromGame()) break;
            if (
              this.state.callStack.currentElement.type == t &&
              this.state.callStack.canPop
            )
              this.state.PopCallStack(),
                n &&
                  (this.state.divertedPointer = this.PointerAtPath(
                    n.targetPath
                  ));
            else {
              let e = new Map();
              e.set(r.Function, "function return statement (~ return)"),
                e.set(r.Tunnel, "tunnel onwards statement (->->)");
              let n = e.get(this.state.callStack.currentElement.type);
              this.state.callStack.canPop ||
                (n = "end of flow (-> END or choice)");
              let i = "Found " + e.get(t) + ", when expected " + n;
              this.Error(i);
            }
            break;
          case k.CommandType.BeginString:
            this.state.PushToOutputStream(e),
              this.Assert(
                !0 === this.state.inExpressionEvaluation,
                "Expected to be in an expression when evaluating a string"
              ),
              (this.state.inExpressionEvaluation = !1);
            break;
          case k.CommandType.EndString:
            let i = [],
              a = 0;
            for (let t = this.state.outputStream.length - 1; t >= 0; --t) {
              let e = this.state.outputStream[t];
              a++;
              let n = s(e, k);
              if (n && n.commandType == k.CommandType.BeginString) break;
              e instanceof E && i.push(e);
            }
            this.state.PopFromOutputStream(a), (i = i.reverse());
            let o = new f();
            for (let t of i) o.Append(t.toString());
            (this.state.inExpressionEvaluation = !0),
              this.state.PushEvaluationStack(new E(o.toString()));
            break;
          case k.CommandType.ChoiceCount:
            let u = this.state.generatedChoices.length;
            this.state.PushEvaluationStack(new w(u));
            break;
          case k.CommandType.Turns:
            this.state.PushEvaluationStack(
              new w(this.state.currentTurnIndex + 1)
            );
            break;
          case k.CommandType.TurnsSince:
          case k.CommandType.ReadCount:
            let h = this.state.PopEvaluationStack();
            if (!(h instanceof P)) {
              let t = "";
              h instanceof w &&
                (t =
                  ". Did you accidentally pass a read count ('knot_name') instead of a target ('-> knot_name')?"),
                this.Error(
                  "TURNS_SINCE / READ_COUNT expected a divert target (knot, stitch, label name), but saw " +
                    h +
                    t
                );
              break;
            }
            let c,
              d = l(h, P),
              m = s(this.ContentAtPath(d.targetPath).correctObj, x);
            null != m
              ? (c =
                  e.commandType == k.CommandType.TurnsSince
                    ? this.state.TurnsSinceForContainer(m)
                    : this.state.VisitCountForContainer(m))
              : ((c = e.commandType == k.CommandType.TurnsSince ? -1 : 0),
                this.Warning(
                  "Failed to find container for " +
                    e.toString() +
                    " lookup at " +
                    d.targetPath.toString()
                )),
              this.state.PushEvaluationStack(new w(c));
            break;
          case k.CommandType.Random: {
            let t = s(this.state.PopEvaluationStack(), w),
              e = s(this.state.PopEvaluationStack(), w);
            if (null == e || e instanceof w == !1)
              return this.Error(
                "Invalid value for minimum parameter of RANDOM(min, max)"
              );
            if (null == t || e instanceof w == !1)
              return this.Error(
                "Invalid value for maximum parameter of RANDOM(min, max)"
              );
            if (null === t.value) return p("maxInt.value");
            if (null === e.value) return p("minInt.value");
            let n = t.value - e.value + 1;
            (!isFinite(n) || n > Number.MAX_SAFE_INTEGER) &&
              ((n = Number.MAX_SAFE_INTEGER),
              this.Error(
                "RANDOM was called with a range that exceeds the size that ink numbers can use."
              )),
              n <= 0 &&
                this.Error(
                  "RANDOM was called with minimum as " +
                    e.value +
                    " and maximum as " +
                    t.value +
                    ". The maximum must be larger"
                );
            let i = this.state.storySeed + this.state.previousRandom,
              r = new z(i).next(),
              a = (r % n) + e.value;
            this.state.PushEvaluationStack(new w(a)),
              (this.state.previousRandom = r);
            break;
          }
          case k.CommandType.SeedRandom:
            let C = s(this.state.PopEvaluationStack(), w);
            if (null == C || C instanceof w == !1)
              return this.Error("Invalid value passed to SEED_RANDOM");
            if (null === C.value) return p("minInt.value");
            (this.state.storySeed = C.value),
              (this.state.previousRandom = 0),
              this.state.PushEvaluationStack(new j());
            break;
          case k.CommandType.VisitIndex:
            let v =
              this.state.VisitCountForContainer(
                this.state.currentPointer.container
              ) - 1;
            this.state.PushEvaluationStack(new w(v));
            break;
          case k.CommandType.SequenceShuffleIndex:
            let _ = this.NextSequenceShuffleIndex();
            this.state.PushEvaluationStack(new w(_));
            break;
          case k.CommandType.StartThread:
            break;
          case k.CommandType.Done:
            this.state.callStack.canPopThread
              ? this.state.callStack.PopThread()
              : ((this.state.didSafeExit = !0),
                (this.state.currentPointer = F.Null));
            break;
          case k.CommandType.End:
            this.state.ForceEnd();
            break;
          case k.CommandType.ListFromInt:
            let T = s(this.state.PopEvaluationStack(), w),
              O = l(this.state.PopEvaluationStack(), E);
            if (null === T)
              throw new y(
                "Passed non-integer when creating a list element from a numerical value."
              );
            let A = null;
            if (null === this.listDefinitions) return p("this.listDefinitions");
            let I = this.listDefinitions.TryListGetDefinition(O.value, null);
            if (!I.exists) throw new y("Failed to find LIST called " + O.value);
            {
              if (null === T.value) return p("minInt.value");
              let t = I.result.TryGetItemWithValue(T.value, g.Null);
              t.exists && (A = new N(t.result, T.value));
            }
            null == A && (A = new N()), this.state.PushEvaluationStack(A);
            break;
          case k.CommandType.ListRange:
            let W = s(this.state.PopEvaluationStack(), b),
              V = s(this.state.PopEvaluationStack(), b),
              L = s(this.state.PopEvaluationStack(), N);
            if (null === L || null === V || null === W)
              throw new y("Expected list, minimum and maximum for LIST_RANGE");
            if (null === L.value) return p("targetList.value");
            let R = L.value.ListWithSubRange(V.valueObject, W.valueObject);
            this.state.PushEvaluationStack(new N(R));
            break;
          case k.CommandType.ListRandom: {
            let t = this.state.PopEvaluationStack();
            if (null === t) throw new y("Expected list for LIST_RANDOM");
            let e = t.value,
              n = null;
            if (null === e) throw p("list");
            if (0 == e.Count) n = new S();
            else {
              let t = this.state.storySeed + this.state.previousRandom,
                i = new z(t).next(),
                r = i % e.Count,
                a = e.entries();
              for (let t = 0; t <= r - 1; t++) a.next();
              let s = a.next().value,
                l = { Key: g.fromSerializedKey(s[0]), Value: s[1] };
              if (null === l.Key.originName)
                return p("randomItem.Key.originName");
              (n = new S(l.Key.originName, this)),
                n.Add(l.Key, l.Value),
                (this.state.previousRandom = i);
            }
            this.state.PushEvaluationStack(new N(n));
            break;
          }
          default:
            this.Error("unhandled ControlCommand: " + e);
        }
        return !0;
      }
      if (t instanceof R) {
        let e = t,
          n = this.state.PopEvaluationStack();
        return this.state.variablesState.Assign(e, n), !0;
      }
      if (t instanceof L) {
        let e = t,
          n = null;
        if (null != e.pathForCount) {
          let t = e.containerForCount,
            i = this.state.VisitCountForContainer(t);
          n = new w(i);
        } else
          (n = this.state.variablesState.GetVariableWithName(e.name)),
            null == n &&
              (this.Warning(
                "Variable not found: '" +
                  e.name +
                  "'. Using default value of 0 (false). This can happen with temporary variables if the declaration hasn't yet been hit. Globals are always given a default value on load if a value doesn't exist in the save state."
              ),
              (n = new w(0)));
        return this.state.PushEvaluationStack(n), !0;
      }
      if (t instanceof D) {
        let e = t,
          n = this.state.PopEvaluationStack(e.numberOfParameters),
          i = e.Call(n);
        return this.state.PushEvaluationStack(i), !0;
      }
      return !1;
    }
    ChoosePathString(t, n = !0, i = []) {
      if (
        (this.IfAsyncWeCant("call ChoosePathString right now"),
        null !== this.onChoosePathString && this.onChoosePathString(t, i),
        n)
      )
        this.ResetCallstack();
      else if (this.state.callStack.currentElement.type == r.Function) {
        let e = "",
          n = this.state.callStack.currentElement.currentPointer.container;
        throw (
          (null != n && (e = "(" + n.path.toString() + ") "),
          new Error(
            "Story was running a function " +
              e +
              "when you called ChoosePathString(" +
              t +
              ") - this is almost certainly not not what you want! Full stack trace: \n" +
              this.state.callStack.callStackTrace
          ))
        );
      }
      this.state.PassArgumentsToEvaluationStack(i), this.ChoosePath(new e(t));
    }
    IfAsyncWeCant(t) {
      if (this._asyncContinueActive)
        throw new Error(
          "Can't " +
            t +
            ". Story is in the middle of a ContinueAsync(). Make more ContinueAsync() calls or a single Continue() call beforehand."
        );
    }
    ChoosePath(t, e = !0) {
      this.state.SetChosenPath(t, e), this.VisitChangedContainersDueToDivert();
    }
    ChooseChoiceIndex(t) {
      t = t;
      let e = this.currentChoices;
      this.Assert(t >= 0 && t < e.length, "choice out of range");
      let n = e[t];
      return (
        null !== this.onMakeChoice && this.onMakeChoice(n),
        null === n.threadAtGeneration
          ? p("choiceToChoose.threadAtGeneration")
          : null === n.targetPath
          ? p("choiceToChoose.targetPath")
          : ((this.state.callStack.currentThread = n.threadAtGeneration),
            void this.ChoosePath(n.targetPath))
      );
    }
    HasFunction(t) {
      try {
        return null != this.KnotContainerWithName(t);
      } catch (t) {
        return !1;
      }
    }
    EvaluateFunction(t, e = [], n = !1) {
      if (
        (null !== this.onEvaluateFunction && this.onEvaluateFunction(t, e),
        this.IfAsyncWeCant("evaluate a function"),
        null == t)
      )
        throw new Error("Function is null");
      if ("" == t || "" == t.trim())
        throw new Error("Function is empty or white space.");
      let i = this.KnotContainerWithName(t);
      if (null == i) throw new Error("Function doesn't exist: '" + t + "'");
      let r = [];
      r.push(...this.state.outputStream),
        this._state.ResetOutput(),
        this.state.StartFunctionEvaluationFromGame(i, e);
      let a = new f();
      for (; this.canContinue; ) a.Append(this.Continue());
      let s = a.toString();
      this._state.ResetOutput(r);
      let l = this.state.CompleteFunctionEvaluationFromGame();
      return (
        null != this.onCompleteEvaluateFunction &&
          this.onCompleteEvaluateFunction(t, e, s, l),
        n ? { returned: l, output: s } : l
      );
    }
    EvaluateExpression(t) {
      let e = this.state.callStack.elements.length;
      this.state.callStack.Push(r.Tunnel),
        (this._temporaryEvaluationContainer = t),
        this.state.GoToStart();
      let n = this.state.evaluationStack.length;
      return (
        this.Continue(),
        (this._temporaryEvaluationContainer = null),
        this.state.callStack.elements.length > e && this.state.PopCallStack(),
        this.state.evaluationStack.length > n
          ? this.state.PopEvaluationStack()
          : null
      );
    }
    CallExternalFunction(t, e) {
      if (null === t) return p("funcName");
      let n = this._externals.get(t),
        i = null,
        a = void 0 !== n;
      if (a && !n.lookAheadSafe && null !== this._stateSnapshotAtLastNewline)
        return void (this._sawLookaheadUnsafeFunctionAfterNewline = !0);
      if (!a) {
        if (this.allowExternalFunctionFallbacks)
          return (
            (i = this.KnotContainerWithName(t)),
            this.Assert(
              null !== i,
              "Trying to call EXTERNAL function '" +
                t +
                "' which has not been bound, and fallback ink function could not be found."
            ),
            this.state.callStack.Push(
              r.Function,
              void 0,
              this.state.outputStream.length
            ),
            void (this.state.divertedPointer = F.StartOf(i))
          );
        this.Assert(
          !1,
          "Trying to call EXTERNAL function '" +
            t +
            "' which has not been bound (and ink fallbacks disabled)."
        );
      }
      let s = [];
      for (let t = 0; t < e; ++t) {
        let t = l(this.state.PopEvaluationStack(), b).valueObject;
        s.push(t);
      }
      s.reverse();
      let o = n.function(s),
        u = null;
      null != o
        ? ((u = b.Create(o)),
          this.Assert(
            null !== u,
            "Could not create ink value from returned object of type " +
              typeof o
          ))
        : (u = new j()),
        this.state.PushEvaluationStack(u);
    }
    BindExternalFunctionGeneral(t, e, n) {
      this.IfAsyncWeCant("bind an external function"),
        this.Assert(
          !this._externals.has(t),
          "Function '" + t + "' has already been bound."
        ),
        this._externals.set(t, { function: e, lookAheadSafe: n });
    }
    TryCoerce(t) {
      return t;
    }
    BindExternalFunction(t, e, n) {
      this.Assert(null != e, "Can't bind a null function"),
        this.BindExternalFunctionGeneral(
          t,
          (t) => {
            this.Assert(
              t.length >= e.length,
              "External function expected " + e.length + " arguments"
            );
            let n = [];
            for (let e = 0, i = t.length; e < i; e++)
              n[e] = this.TryCoerce(t[e]);
            return e.apply(null, n);
          },
          n
        );
    }
    UnbindExternalFunction(t) {
      this.IfAsyncWeCant("unbind an external a function"),
        this.Assert(
          this._externals.has(t),
          "Function '" + t + "' has not been bound."
        ),
        this._externals.delete(t);
    }
    ValidateExternalBindings() {
      let t = null,
        e = null,
        n = arguments[1] || new Set();
      if (
        (arguments[0] instanceof x && (t = arguments[0]),
        arguments[0] instanceof m && (e = arguments[0]),
        null === t && null === e)
      )
        if (
          (this.ValidateExternalBindings(this._mainContentContainer, n),
          (this._hasValidatedExternals = !0),
          0 == n.size)
        )
          this._hasValidatedExternals = !0;
        else {
          let t = "Error: Missing function binding for external";
          (t += n.size > 1 ? "s" : ""),
            (t += ": '"),
            (t += Array.from(n).join("', '")),
            (t += "' "),
            (t += this.allowExternalFunctionFallbacks
              ? ", and no fallback ink function found."
              : " (ink fallbacks disabled)"),
            this.Error(t);
        }
      else if (null != t) {
        for (let e of t.content) {
          let t = e;
          (null != t && t.hasValidName) || this.ValidateExternalBindings(e, n);
        }
        for (let [, e] of t.namedContent)
          this.ValidateExternalBindings(s(e, m), n);
      } else if (null != e) {
        let t = s(e, W);
        if (t && t.isExternal) {
          let e = t.targetPathString;
          if (null === e) return p("name");
          if (!this._externals.has(e))
            if (this.allowExternalFunctionFallbacks) {
              this.mainContentContainer.namedContent.has(e) || n.add(e);
            } else n.add(e);
        }
      }
    }
    ObserveVariable(t, e) {
      if (
        (this.IfAsyncWeCant("observe a new variable"),
        null === this._variableObservers &&
          (this._variableObservers = new Map()),
        !this.state.variablesState.GlobalVariableExistsWithName(t))
      )
        throw new Error(
          "Cannot observe variable '" +
            t +
            "' because it wasn't declared in the ink story."
        );
      this._variableObservers.has(t)
        ? this._variableObservers.get(t).push(e)
        : this._variableObservers.set(t, [e]);
    }
    ObserveVariables(t, e) {
      for (let n = 0, i = t.length; n < i; n++)
        this.ObserveVariable(t[n], e[n]);
    }
    RemoveVariableObserver(t, e) {
      if (
        (this.IfAsyncWeCant("remove a variable observer"),
        null !== this._variableObservers)
      )
        if (null != e) {
          if (this._variableObservers.has(e))
            if (null != t) {
              let n = this._variableObservers.get(e);
              null != n &&
                (n.splice(n.indexOf(t), 1),
                0 === n.length && this._variableObservers.delete(e));
            } else this._variableObservers.delete(e);
        } else if (null != t) {
          let e = this._variableObservers.keys();
          for (let n of e) {
            let e = this._variableObservers.get(n);
            null != e &&
              (e.splice(e.indexOf(t), 1),
              0 === e.length && this._variableObservers.delete(n));
          }
        }
    }
    VariableStateDidChangeEvent(t, e) {
      if (null === this._variableObservers) return;
      let n = this._variableObservers.get(t);
      if (void 0 !== n) {
        if (!(e instanceof b))
          throw new Error(
            "Tried to get the value of a variable that isn't a standard type"
          );
        let i = l(e, b);
        for (let e of n) e(t, i.valueObject);
      }
    }
    get globalTags() {
      return this.TagsAtStartOfFlowContainerWithPathString("");
    }
    TagsForContentAtPath(t) {
      return this.TagsAtStartOfFlowContainerWithPathString(t);
    }
    TagsAtStartOfFlowContainerWithPathString(t) {
      let n = new e(t),
        i = this.ContentAtPath(n).container;
      if (null === i) return p("flowContainer");
      for (;;) {
        let t = i.content[0];
        if (!(t instanceof x)) break;
        i = t;
      }
      let r = null;
      for (let t of i.content) {
        let e = s(t, B);
        if (!e) break;
        null == r && (r = []), r.push(e.text);
      }
      return r;
    }
    BuildStringOfHierarchy() {
      let t = new f();
      return (
        this.mainContentContainer.BuildStringOfHierarchy(
          t,
          0,
          this.state.currentPointer.Resolve()
        ),
        t.toString()
      );
    }
    BuildStringOfContainer(t) {
      let e = new f();
      return (
        t.BuildStringOfHierarchy(e, 0, this.state.currentPointer.Resolve()),
        e.toString()
      );
    }
    NextContent() {
      if (
        ((this.state.previousPointer = this.state.currentPointer.copy()),
        !this.state.divertedPointer.isNull &&
          ((this.state.currentPointer = this.state.divertedPointer.copy()),
          (this.state.divertedPointer = F.Null),
          this.VisitChangedContainersDueToDivert(),
          !this.state.currentPointer.isNull))
      )
        return;
      if (!this.IncrementContentPointer()) {
        let t = !1;
        this.state.callStack.CanPop(r.Function)
          ? (this.state.PopCallStack(r.Function),
            this.state.inExpressionEvaluation &&
              this.state.PushEvaluationStack(new j()),
            (t = !0))
          : this.state.callStack.canPopThread
          ? (this.state.callStack.PopThread(), (t = !0))
          : this.state.TryExitFunctionEvaluationFromGame(),
          t && !this.state.currentPointer.isNull && this.NextContent();
      }
    }
    IncrementContentPointer() {
      let t = !0,
        e = this.state.callStack.currentElement.currentPointer.copy();
      if ((e.index++, null === e.container)) return p("pointer.container");
      for (; e.index >= e.container.content.length; ) {
        t = !1;
        let n = s(e.container.parent, x);
        if (n instanceof x == !1) break;
        let i = n.content.indexOf(e.container);
        if (-1 == i) break;
        if (((e = new F(n, i)), e.index++, (t = !0), null === e.container))
          return p("pointer.container");
      }
      return (
        t || (e = F.Null),
        (this.state.callStack.currentElement.currentPointer = e.copy()),
        t
      );
    }
    TryFollowDefaultInvisibleChoice() {
      let t = this._state.currentChoices,
        e = t.filter((t) => t.isInvisibleDefault);
      if (0 == e.length || t.length > e.length) return !1;
      let n = e[0];
      return null === n.targetPath
        ? p("choice.targetPath")
        : null === n.threadAtGeneration
        ? p("choice.threadAtGeneration")
        : ((this.state.callStack.currentThread = n.threadAtGeneration),
          null !== this._stateSnapshotAtLastNewline &&
            (this.state.callStack.currentThread =
              this.state.callStack.ForkThread()),
          this.ChoosePath(n.targetPath, !1),
          !0);
    }
    NextSequenceShuffleIndex() {
      let t = s(this.state.PopEvaluationStack(), w);
      if (!(t instanceof w))
        return (
          this.Error(
            "expected number of elements in sequence for shuffle index"
          ),
          0
        );
      let e = this.state.currentPointer.container;
      if (null === e) return p("seqContainer");
      if (null === t.value) return p("numElementsIntVal.value");
      let n = t.value,
        i = l(this.state.PopEvaluationStack(), w).value;
      if (null === i) return p("seqCount");
      let r = i / n,
        a = i % n,
        o = e.path.toString(),
        u = 0;
      for (let t = 0, e = o.length; t < e; t++) u += o.charCodeAt(t) || 0;
      let h = u + r + this.state.storySeed,
        c = new z(Math.floor(h)),
        d = [];
      for (let t = 0; t < n; ++t) d.push(t);
      for (let t = 0; t <= a; ++t) {
        let e = c.next() % d.length,
          n = d[e];
        if ((d.splice(e, 1), t == a)) return n;
      }
      throw new Error("Should never reach here");
    }
    Error(t, e = !1) {
      let n = new y(t);
      throw ((n.useEndLineNumber = e), n);
    }
    Warning(t) {
      this.AddError(t, !0);
    }
    AddError(t, e = !1, n = !1) {
      let i = this.currentDebugMetadata,
        r = e ? "WARNING" : "ERROR";
      if (null != i) {
        let e = n ? i.endLineNumber : i.startLineNumber;
        t = "RUNTIME " + r + ": '" + i.fileName + "' line " + e + ": " + t;
      } else t = this.state.currentPointer.isNull ? "RUNTIME " + r + ": " + t : "RUNTIME " + r + ": (" + this.state.currentPointer + "): " + t;
      this.state.AddError(t, e), e || this.state.ForceEnd();
    }
    Assert(t, e = null) {
      if (0 == t)
        throw (
          (null == e && (e = "Story assert"),
          new Error(e + " " + this.currentDebugMetadata))
        );
    }
    get currentDebugMetadata() {
      let t,
        e = this.state.currentPointer;
      if (
        !e.isNull &&
        null !== e.Resolve() &&
        ((t = e.Resolve().debugMetadata), null !== t)
      )
        return t;
      for (let n = this.state.callStack.elements.length - 1; n >= 0; --n)
        if (
          ((e = this.state.callStack.elements[n].currentPointer),
          !e.isNull &&
            null !== e.Resolve() &&
            ((t = e.Resolve().debugMetadata), null !== t))
        )
          return t;
      for (let e = this.state.outputStream.length - 1; e >= 0; --e) {
        if (((t = this.state.outputStream[e].debugMetadata), null !== t))
          return t;
      }
      return null;
    }
    get mainContentContainer() {
      return this._temporaryEvaluationContainer
        ? this._temporaryEvaluationContainer
        : this._mainContentContainer;
    }
  }
  (Z.inkVersionCurrent = 20),
    (function (t) {
      var e;
      ((e = t.OutputStateChange || (t.OutputStateChange = {}))[
        (e.NoChange = 0)
      ] = "NoChange"),
        (e[(e.ExtendedBeyondNewline = 1)] = "ExtendedBeyondNewline"),
        (e[(e.NewlineRemoved = 2)] = "NewlineRemoved");
    })(Z || (Z = {})),
    (t.InkList = S),
    (t.Story = Z),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
//# sourceMappingURL=ink-es2015.js.map
