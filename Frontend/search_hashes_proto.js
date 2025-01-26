/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import $protobuf from "protobufjs";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const safe_browsing = $root.safe_browsing = (() => {

    /**
     * Namespace safe_browsing.
     * @exports safe_browsing
     * @namespace
     */
    const safe_browsing = {};

    safe_browsing.V5 = (function() {

        /**
         * Namespace V5.
         * @memberof safe_browsing
         * @namespace
         */
        const V5 = {};

        V5.SearchHashesRequest = (function() {

            /**
             * Properties of a SearchHashesRequest.
             * @memberof safe_browsing.V5
             * @interface ISearchHashesRequest
             * @property {Array.<Uint8Array>|null} [hashPrefixes] SearchHashesRequest hashPrefixes
             */

            /**
             * Constructs a new SearchHashesRequest.
             * @memberof safe_browsing.V5
             * @classdesc Represents a SearchHashesRequest.
             * @implements ISearchHashesRequest
             * @constructor
             * @param {safe_browsing.V5.ISearchHashesRequest=} [properties] Properties to set
             */
            function SearchHashesRequest(properties) {
                this.hashPrefixes = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SearchHashesRequest hashPrefixes.
             * @member {Array.<Uint8Array>} hashPrefixes
             * @memberof safe_browsing.V5.SearchHashesRequest
             * @instance
             */
            SearchHashesRequest.prototype.hashPrefixes = $util.emptyArray;

            /**
             * Creates a new SearchHashesRequest instance using the specified properties.
             * @function create
             * @memberof safe_browsing.V5.SearchHashesRequest
             * @static
             * @param {safe_browsing.V5.ISearchHashesRequest=} [properties] Properties to set
             * @returns {safe_browsing.V5.SearchHashesRequest} SearchHashesRequest instance
             */
            SearchHashesRequest.create = function create(properties) {
                return new SearchHashesRequest(properties);
            };

            /**
             * Encodes the specified SearchHashesRequest message. Does not implicitly {@link safe_browsing.V5.SearchHashesRequest.verify|verify} messages.
             * @function encode
             * @memberof safe_browsing.V5.SearchHashesRequest
             * @static
             * @param {safe_browsing.V5.ISearchHashesRequest} message SearchHashesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SearchHashesRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.hashPrefixes != null && message.hashPrefixes.length)
                    for (let i = 0; i < message.hashPrefixes.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.hashPrefixes[i]);
                return writer;
            };

            /**
             * Encodes the specified SearchHashesRequest message, length delimited. Does not implicitly {@link safe_browsing.V5.SearchHashesRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof safe_browsing.V5.SearchHashesRequest
             * @static
             * @param {safe_browsing.V5.ISearchHashesRequest} message SearchHashesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SearchHashesRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SearchHashesRequest message from the specified reader or buffer.
             * @function decode
             * @memberof safe_browsing.V5.SearchHashesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {safe_browsing.V5.SearchHashesRequest} SearchHashesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SearchHashesRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.safe_browsing.V5.SearchHashesRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.hashPrefixes && message.hashPrefixes.length))
                                message.hashPrefixes = [];
                            message.hashPrefixes.push(reader.bytes());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SearchHashesRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof safe_browsing.V5.SearchHashesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {safe_browsing.V5.SearchHashesRequest} SearchHashesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SearchHashesRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SearchHashesRequest message.
             * @function verify
             * @memberof safe_browsing.V5.SearchHashesRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SearchHashesRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.hashPrefixes != null && message.hasOwnProperty("hashPrefixes")) {
                    if (!Array.isArray(message.hashPrefixes))
                        return "hashPrefixes: array expected";
                    for (let i = 0; i < message.hashPrefixes.length; ++i)
                        if (!(message.hashPrefixes[i] && typeof message.hashPrefixes[i].length === "number" || $util.isString(message.hashPrefixes[i])))
                            return "hashPrefixes: buffer[] expected";
                }
                return null;
            };

            /**
             * Creates a SearchHashesRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof safe_browsing.V5.SearchHashesRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {safe_browsing.V5.SearchHashesRequest} SearchHashesRequest
             */
            SearchHashesRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.safe_browsing.V5.SearchHashesRequest)
                    return object;
                let message = new $root.safe_browsing.V5.SearchHashesRequest();
                if (object.hashPrefixes) {
                    if (!Array.isArray(object.hashPrefixes))
                        throw TypeError(".safe_browsing.V5.SearchHashesRequest.hashPrefixes: array expected");
                    message.hashPrefixes = [];
                    for (let i = 0; i < object.hashPrefixes.length; ++i)
                        if (typeof object.hashPrefixes[i] === "string")
                            $util.base64.decode(object.hashPrefixes[i], message.hashPrefixes[i] = $util.newBuffer($util.base64.length(object.hashPrefixes[i])), 0);
                        else if (object.hashPrefixes[i].length >= 0)
                            message.hashPrefixes[i] = object.hashPrefixes[i];
                }
                return message;
            };

            /**
             * Creates a plain object from a SearchHashesRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof safe_browsing.V5.SearchHashesRequest
             * @static
             * @param {safe_browsing.V5.SearchHashesRequest} message SearchHashesRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SearchHashesRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.hashPrefixes = [];
                if (message.hashPrefixes && message.hashPrefixes.length) {
                    object.hashPrefixes = [];
                    for (let j = 0; j < message.hashPrefixes.length; ++j)
                        object.hashPrefixes[j] = options.bytes === String ? $util.base64.encode(message.hashPrefixes[j], 0, message.hashPrefixes[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.hashPrefixes[j]) : message.hashPrefixes[j];
                }
                return object;
            };

            /**
             * Converts this SearchHashesRequest to JSON.
             * @function toJSON
             * @memberof safe_browsing.V5.SearchHashesRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SearchHashesRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SearchHashesRequest
             * @function getTypeUrl
             * @memberof safe_browsing.V5.SearchHashesRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SearchHashesRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/safe_browsing.V5.SearchHashesRequest";
            };

            return SearchHashesRequest;
        })();

        V5.SearchHashesResponse = (function() {

            /**
             * Properties of a SearchHashesResponse.
             * @memberof safe_browsing.V5
             * @interface ISearchHashesResponse
             * @property {Array.<safe_browsing.V5.IFullHash>|null} [fullHashes] SearchHashesResponse fullHashes
             * @property {safe_browsing.V5.IDuration|null} [cacheDuration] SearchHashesResponse cacheDuration
             */

            /**
             * Constructs a new SearchHashesResponse.
             * @memberof safe_browsing.V5
             * @classdesc Represents a SearchHashesResponse.
             * @implements ISearchHashesResponse
             * @constructor
             * @param {safe_browsing.V5.ISearchHashesResponse=} [properties] Properties to set
             */
            function SearchHashesResponse(properties) {
                this.fullHashes = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SearchHashesResponse fullHashes.
             * @member {Array.<safe_browsing.V5.IFullHash>} fullHashes
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @instance
             */
            SearchHashesResponse.prototype.fullHashes = $util.emptyArray;

            /**
             * SearchHashesResponse cacheDuration.
             * @member {safe_browsing.V5.IDuration|null|undefined} cacheDuration
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @instance
             */
            SearchHashesResponse.prototype.cacheDuration = null;

            /**
             * Creates a new SearchHashesResponse instance using the specified properties.
             * @function create
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @static
             * @param {safe_browsing.V5.ISearchHashesResponse=} [properties] Properties to set
             * @returns {safe_browsing.V5.SearchHashesResponse} SearchHashesResponse instance
             */
            SearchHashesResponse.create = function create(properties) {
                return new SearchHashesResponse(properties);
            };

            /**
             * Encodes the specified SearchHashesResponse message. Does not implicitly {@link safe_browsing.V5.SearchHashesResponse.verify|verify} messages.
             * @function encode
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @static
             * @param {safe_browsing.V5.ISearchHashesResponse} message SearchHashesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SearchHashesResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.fullHashes != null && message.fullHashes.length)
                    for (let i = 0; i < message.fullHashes.length; ++i)
                        $root.safe_browsing.V5.FullHash.encode(message.fullHashes[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.cacheDuration != null && Object.hasOwnProperty.call(message, "cacheDuration"))
                    $root.safe_browsing.V5.Duration.encode(message.cacheDuration, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified SearchHashesResponse message, length delimited. Does not implicitly {@link safe_browsing.V5.SearchHashesResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @static
             * @param {safe_browsing.V5.ISearchHashesResponse} message SearchHashesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SearchHashesResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SearchHashesResponse message from the specified reader or buffer.
             * @function decode
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {safe_browsing.V5.SearchHashesResponse} SearchHashesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SearchHashesResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.safe_browsing.V5.SearchHashesResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.fullHashes && message.fullHashes.length))
                                message.fullHashes = [];
                            message.fullHashes.push($root.safe_browsing.V5.FullHash.decode(reader, reader.uint32()));
                            break;
                        }
                    case 2: {
                            message.cacheDuration = $root.safe_browsing.V5.Duration.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SearchHashesResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {safe_browsing.V5.SearchHashesResponse} SearchHashesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SearchHashesResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SearchHashesResponse message.
             * @function verify
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SearchHashesResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.fullHashes != null && message.hasOwnProperty("fullHashes")) {
                    if (!Array.isArray(message.fullHashes))
                        return "fullHashes: array expected";
                    for (let i = 0; i < message.fullHashes.length; ++i) {
                        let error = $root.safe_browsing.V5.FullHash.verify(message.fullHashes[i]);
                        if (error)
                            return "fullHashes." + error;
                    }
                }
                if (message.cacheDuration != null && message.hasOwnProperty("cacheDuration")) {
                    let error = $root.safe_browsing.V5.Duration.verify(message.cacheDuration);
                    if (error)
                        return "cacheDuration." + error;
                }
                return null;
            };

            /**
             * Creates a SearchHashesResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {safe_browsing.V5.SearchHashesResponse} SearchHashesResponse
             */
            SearchHashesResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.safe_browsing.V5.SearchHashesResponse)
                    return object;
                let message = new $root.safe_browsing.V5.SearchHashesResponse();
                if (object.fullHashes) {
                    if (!Array.isArray(object.fullHashes))
                        throw TypeError(".safe_browsing.V5.SearchHashesResponse.fullHashes: array expected");
                    message.fullHashes = [];
                    for (let i = 0; i < object.fullHashes.length; ++i) {
                        if (typeof object.fullHashes[i] !== "object")
                            throw TypeError(".safe_browsing.V5.SearchHashesResponse.fullHashes: object expected");
                        message.fullHashes[i] = $root.safe_browsing.V5.FullHash.fromObject(object.fullHashes[i]);
                    }
                }
                if (object.cacheDuration != null) {
                    if (typeof object.cacheDuration !== "object")
                        throw TypeError(".safe_browsing.V5.SearchHashesResponse.cacheDuration: object expected");
                    message.cacheDuration = $root.safe_browsing.V5.Duration.fromObject(object.cacheDuration);
                }
                return message;
            };

            /**
             * Creates a plain object from a SearchHashesResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @static
             * @param {safe_browsing.V5.SearchHashesResponse} message SearchHashesResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SearchHashesResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.fullHashes = [];
                if (options.defaults)
                    object.cacheDuration = null;
                if (message.fullHashes && message.fullHashes.length) {
                    object.fullHashes = [];
                    for (let j = 0; j < message.fullHashes.length; ++j)
                        object.fullHashes[j] = $root.safe_browsing.V5.FullHash.toObject(message.fullHashes[j], options);
                }
                if (message.cacheDuration != null && message.hasOwnProperty("cacheDuration"))
                    object.cacheDuration = $root.safe_browsing.V5.Duration.toObject(message.cacheDuration, options);
                return object;
            };

            /**
             * Converts this SearchHashesResponse to JSON.
             * @function toJSON
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SearchHashesResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SearchHashesResponse
             * @function getTypeUrl
             * @memberof safe_browsing.V5.SearchHashesResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SearchHashesResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/safe_browsing.V5.SearchHashesResponse";
            };

            return SearchHashesResponse;
        })();

        V5.FullHash = (function() {

            /**
             * Properties of a FullHash.
             * @memberof safe_browsing.V5
             * @interface IFullHash
             * @property {Uint8Array|null} [fullHash] FullHash fullHash
             * @property {Array.<safe_browsing.V5.FullHash.IFullHashDetail>|null} [fullHashDetails] FullHash fullHashDetails
             */

            /**
             * Constructs a new FullHash.
             * @memberof safe_browsing.V5
             * @classdesc Represents a FullHash.
             * @implements IFullHash
             * @constructor
             * @param {safe_browsing.V5.IFullHash=} [properties] Properties to set
             */
            function FullHash(properties) {
                this.fullHashDetails = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FullHash fullHash.
             * @member {Uint8Array} fullHash
             * @memberof safe_browsing.V5.FullHash
             * @instance
             */
            FullHash.prototype.fullHash = $util.newBuffer([]);

            /**
             * FullHash fullHashDetails.
             * @member {Array.<safe_browsing.V5.FullHash.IFullHashDetail>} fullHashDetails
             * @memberof safe_browsing.V5.FullHash
             * @instance
             */
            FullHash.prototype.fullHashDetails = $util.emptyArray;

            /**
             * Creates a new FullHash instance using the specified properties.
             * @function create
             * @memberof safe_browsing.V5.FullHash
             * @static
             * @param {safe_browsing.V5.IFullHash=} [properties] Properties to set
             * @returns {safe_browsing.V5.FullHash} FullHash instance
             */
            FullHash.create = function create(properties) {
                return new FullHash(properties);
            };

            /**
             * Encodes the specified FullHash message. Does not implicitly {@link safe_browsing.V5.FullHash.verify|verify} messages.
             * @function encode
             * @memberof safe_browsing.V5.FullHash
             * @static
             * @param {safe_browsing.V5.IFullHash} message FullHash message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FullHash.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.fullHash != null && Object.hasOwnProperty.call(message, "fullHash"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.fullHash);
                if (message.fullHashDetails != null && message.fullHashDetails.length)
                    for (let i = 0; i < message.fullHashDetails.length; ++i)
                        $root.safe_browsing.V5.FullHash.FullHashDetail.encode(message.fullHashDetails[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified FullHash message, length delimited. Does not implicitly {@link safe_browsing.V5.FullHash.verify|verify} messages.
             * @function encodeDelimited
             * @memberof safe_browsing.V5.FullHash
             * @static
             * @param {safe_browsing.V5.IFullHash} message FullHash message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FullHash.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FullHash message from the specified reader or buffer.
             * @function decode
             * @memberof safe_browsing.V5.FullHash
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {safe_browsing.V5.FullHash} FullHash
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FullHash.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.safe_browsing.V5.FullHash();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.fullHash = reader.bytes();
                            break;
                        }
                    case 2: {
                            if (!(message.fullHashDetails && message.fullHashDetails.length))
                                message.fullHashDetails = [];
                            message.fullHashDetails.push($root.safe_browsing.V5.FullHash.FullHashDetail.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a FullHash message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof safe_browsing.V5.FullHash
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {safe_browsing.V5.FullHash} FullHash
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FullHash.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a FullHash message.
             * @function verify
             * @memberof safe_browsing.V5.FullHash
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FullHash.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.fullHash != null && message.hasOwnProperty("fullHash"))
                    if (!(message.fullHash && typeof message.fullHash.length === "number" || $util.isString(message.fullHash)))
                        return "fullHash: buffer expected";
                if (message.fullHashDetails != null && message.hasOwnProperty("fullHashDetails")) {
                    if (!Array.isArray(message.fullHashDetails))
                        return "fullHashDetails: array expected";
                    for (let i = 0; i < message.fullHashDetails.length; ++i) {
                        let error = $root.safe_browsing.V5.FullHash.FullHashDetail.verify(message.fullHashDetails[i]);
                        if (error)
                            return "fullHashDetails." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a FullHash message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof safe_browsing.V5.FullHash
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {safe_browsing.V5.FullHash} FullHash
             */
            FullHash.fromObject = function fromObject(object) {
                if (object instanceof $root.safe_browsing.V5.FullHash)
                    return object;
                let message = new $root.safe_browsing.V5.FullHash();
                if (object.fullHash != null)
                    if (typeof object.fullHash === "string")
                        $util.base64.decode(object.fullHash, message.fullHash = $util.newBuffer($util.base64.length(object.fullHash)), 0);
                    else if (object.fullHash.length >= 0)
                        message.fullHash = object.fullHash;
                if (object.fullHashDetails) {
                    if (!Array.isArray(object.fullHashDetails))
                        throw TypeError(".safe_browsing.V5.FullHash.fullHashDetails: array expected");
                    message.fullHashDetails = [];
                    for (let i = 0; i < object.fullHashDetails.length; ++i) {
                        if (typeof object.fullHashDetails[i] !== "object")
                            throw TypeError(".safe_browsing.V5.FullHash.fullHashDetails: object expected");
                        message.fullHashDetails[i] = $root.safe_browsing.V5.FullHash.FullHashDetail.fromObject(object.fullHashDetails[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a FullHash message. Also converts values to other types if specified.
             * @function toObject
             * @memberof safe_browsing.V5.FullHash
             * @static
             * @param {safe_browsing.V5.FullHash} message FullHash
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FullHash.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.fullHashDetails = [];
                if (options.defaults)
                    if (options.bytes === String)
                        object.fullHash = "";
                    else {
                        object.fullHash = [];
                        if (options.bytes !== Array)
                            object.fullHash = $util.newBuffer(object.fullHash);
                    }
                if (message.fullHash != null && message.hasOwnProperty("fullHash"))
                    object.fullHash = options.bytes === String ? $util.base64.encode(message.fullHash, 0, message.fullHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.fullHash) : message.fullHash;
                if (message.fullHashDetails && message.fullHashDetails.length) {
                    object.fullHashDetails = [];
                    for (let j = 0; j < message.fullHashDetails.length; ++j)
                        object.fullHashDetails[j] = $root.safe_browsing.V5.FullHash.FullHashDetail.toObject(message.fullHashDetails[j], options);
                }
                return object;
            };

            /**
             * Converts this FullHash to JSON.
             * @function toJSON
             * @memberof safe_browsing.V5.FullHash
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FullHash.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for FullHash
             * @function getTypeUrl
             * @memberof safe_browsing.V5.FullHash
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            FullHash.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/safe_browsing.V5.FullHash";
            };

            FullHash.FullHashDetail = (function() {

                /**
                 * Properties of a FullHashDetail.
                 * @memberof safe_browsing.V5.FullHash
                 * @interface IFullHashDetail
                 * @property {safe_browsing.V5.ThreatType|null} [threatType] FullHashDetail threatType
                 * @property {Array.<safe_browsing.V5.ThreatAttribute>|null} [attributes] FullHashDetail attributes
                 */

                /**
                 * Constructs a new FullHashDetail.
                 * @memberof safe_browsing.V5.FullHash
                 * @classdesc Represents a FullHashDetail.
                 * @implements IFullHashDetail
                 * @constructor
                 * @param {safe_browsing.V5.FullHash.IFullHashDetail=} [properties] Properties to set
                 */
                function FullHashDetail(properties) {
                    this.attributes = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * FullHashDetail threatType.
                 * @member {safe_browsing.V5.ThreatType} threatType
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @instance
                 */
                FullHashDetail.prototype.threatType = 0;

                /**
                 * FullHashDetail attributes.
                 * @member {Array.<safe_browsing.V5.ThreatAttribute>} attributes
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @instance
                 */
                FullHashDetail.prototype.attributes = $util.emptyArray;

                /**
                 * Creates a new FullHashDetail instance using the specified properties.
                 * @function create
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @static
                 * @param {safe_browsing.V5.FullHash.IFullHashDetail=} [properties] Properties to set
                 * @returns {safe_browsing.V5.FullHash.FullHashDetail} FullHashDetail instance
                 */
                FullHashDetail.create = function create(properties) {
                    return new FullHashDetail(properties);
                };

                /**
                 * Encodes the specified FullHashDetail message. Does not implicitly {@link safe_browsing.V5.FullHash.FullHashDetail.verify|verify} messages.
                 * @function encode
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @static
                 * @param {safe_browsing.V5.FullHash.IFullHashDetail} message FullHashDetail message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FullHashDetail.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.threatType != null && Object.hasOwnProperty.call(message, "threatType"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.threatType);
                    if (message.attributes != null && message.attributes.length) {
                        writer.uint32(/* id 2, wireType 2 =*/18).fork();
                        for (let i = 0; i < message.attributes.length; ++i)
                            writer.int32(message.attributes[i]);
                        writer.ldelim();
                    }
                    return writer;
                };

                /**
                 * Encodes the specified FullHashDetail message, length delimited. Does not implicitly {@link safe_browsing.V5.FullHash.FullHashDetail.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @static
                 * @param {safe_browsing.V5.FullHash.IFullHashDetail} message FullHashDetail message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FullHashDetail.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a FullHashDetail message from the specified reader or buffer.
                 * @function decode
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {safe_browsing.V5.FullHash.FullHashDetail} FullHashDetail
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FullHashDetail.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.safe_browsing.V5.FullHash.FullHashDetail();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.threatType = reader.int32();
                                break;
                            }
                        case 2: {
                                if (!(message.attributes && message.attributes.length))
                                    message.attributes = [];
                                if ((tag & 7) === 2) {
                                    let end2 = reader.uint32() + reader.pos;
                                    while (reader.pos < end2)
                                        message.attributes.push(reader.int32());
                                } else
                                    message.attributes.push(reader.int32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a FullHashDetail message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {safe_browsing.V5.FullHash.FullHashDetail} FullHashDetail
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FullHashDetail.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a FullHashDetail message.
                 * @function verify
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                FullHashDetail.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.threatType != null && message.hasOwnProperty("threatType"))
                        switch (message.threatType) {
                        default:
                            return "threatType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 6:
                        case 15:
                        case 20:
                        case 21:
                            break;
                        }
                    if (message.attributes != null && message.hasOwnProperty("attributes")) {
                        if (!Array.isArray(message.attributes))
                            return "attributes: array expected";
                        for (let i = 0; i < message.attributes.length; ++i)
                            switch (message.attributes[i]) {
                            default:
                                return "attributes: enum value[] expected";
                            case 0:
                            case 1:
                            case 2:
                                break;
                            }
                    }
                    return null;
                };

                /**
                 * Creates a FullHashDetail message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {safe_browsing.V5.FullHash.FullHashDetail} FullHashDetail
                 */
                FullHashDetail.fromObject = function fromObject(object) {
                    if (object instanceof $root.safe_browsing.V5.FullHash.FullHashDetail)
                        return object;
                    let message = new $root.safe_browsing.V5.FullHash.FullHashDetail();
                    switch (object.threatType) {
                    default:
                        if (typeof object.threatType === "number") {
                            message.threatType = object.threatType;
                            break;
                        }
                        break;
                    case "THREAT_TYPE_UNSPECIFIED":
                    case 0:
                        message.threatType = 0;
                        break;
                    case "MALWARE":
                    case 1:
                        message.threatType = 1;
                        break;
                    case "SOCIAL_ENGINEERING":
                    case 2:
                        message.threatType = 2;
                        break;
                    case "UNWANTED_SOFTWARE":
                    case 3:
                        message.threatType = 3;
                        break;
                    case "POTENTIALLY_HARMFUL_APPLICATION":
                    case 4:
                        message.threatType = 4;
                        break;
                    case "API_ABUSE":
                    case 6:
                        message.threatType = 6;
                        break;
                    case "TRICK_TO_BILL":
                    case 15:
                        message.threatType = 15;
                        break;
                    case "ABUSIVE_EXPERIENCE_VIOLATION":
                    case 20:
                        message.threatType = 20;
                        break;
                    case "BETTER_ADS_VIOLATION":
                    case 21:
                        message.threatType = 21;
                        break;
                    }
                    if (object.attributes) {
                        if (!Array.isArray(object.attributes))
                            throw TypeError(".safe_browsing.V5.FullHash.FullHashDetail.attributes: array expected");
                        message.attributes = [];
                        for (let i = 0; i < object.attributes.length; ++i)
                            switch (object.attributes[i]) {
                            default:
                                if (typeof object.attributes[i] === "number") {
                                    message.attributes[i] = object.attributes[i];
                                    break;
                                }
                            case "THREAT_ATTRIBUTE_UNSPECIFIED":
                            case 0:
                                message.attributes[i] = 0;
                                break;
                            case "CANARY":
                            case 1:
                                message.attributes[i] = 1;
                                break;
                            case "FRAME_ONLY":
                            case 2:
                                message.attributes[i] = 2;
                                break;
                            }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a FullHashDetail message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @static
                 * @param {safe_browsing.V5.FullHash.FullHashDetail} message FullHashDetail
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                FullHashDetail.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.attributes = [];
                    if (options.defaults)
                        object.threatType = options.enums === String ? "THREAT_TYPE_UNSPECIFIED" : 0;
                    if (message.threatType != null && message.hasOwnProperty("threatType"))
                        object.threatType = options.enums === String ? $root.safe_browsing.V5.ThreatType[message.threatType] === undefined ? message.threatType : $root.safe_browsing.V5.ThreatType[message.threatType] : message.threatType;
                    if (message.attributes && message.attributes.length) {
                        object.attributes = [];
                        for (let j = 0; j < message.attributes.length; ++j)
                            object.attributes[j] = options.enums === String ? $root.safe_browsing.V5.ThreatAttribute[message.attributes[j]] === undefined ? message.attributes[j] : $root.safe_browsing.V5.ThreatAttribute[message.attributes[j]] : message.attributes[j];
                    }
                    return object;
                };

                /**
                 * Converts this FullHashDetail to JSON.
                 * @function toJSON
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                FullHashDetail.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for FullHashDetail
                 * @function getTypeUrl
                 * @memberof safe_browsing.V5.FullHash.FullHashDetail
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                FullHashDetail.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/safe_browsing.V5.FullHash.FullHashDetail";
                };

                return FullHashDetail;
            })();

            return FullHash;
        })();

        /**
         * ThreatType enum.
         * @name safe_browsing.V5.ThreatType
         * @enum {number}
         * @property {number} THREAT_TYPE_UNSPECIFIED=0 THREAT_TYPE_UNSPECIFIED value
         * @property {number} MALWARE=1 MALWARE value
         * @property {number} SOCIAL_ENGINEERING=2 SOCIAL_ENGINEERING value
         * @property {number} UNWANTED_SOFTWARE=3 UNWANTED_SOFTWARE value
         * @property {number} POTENTIALLY_HARMFUL_APPLICATION=4 POTENTIALLY_HARMFUL_APPLICATION value
         * @property {number} API_ABUSE=6 API_ABUSE value
         * @property {number} TRICK_TO_BILL=15 TRICK_TO_BILL value
         * @property {number} ABUSIVE_EXPERIENCE_VIOLATION=20 ABUSIVE_EXPERIENCE_VIOLATION value
         * @property {number} BETTER_ADS_VIOLATION=21 BETTER_ADS_VIOLATION value
         */
        V5.ThreatType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "THREAT_TYPE_UNSPECIFIED"] = 0;
            values[valuesById[1] = "MALWARE"] = 1;
            values[valuesById[2] = "SOCIAL_ENGINEERING"] = 2;
            values[valuesById[3] = "UNWANTED_SOFTWARE"] = 3;
            values[valuesById[4] = "POTENTIALLY_HARMFUL_APPLICATION"] = 4;
            values[valuesById[6] = "API_ABUSE"] = 6;
            values[valuesById[15] = "TRICK_TO_BILL"] = 15;
            values[valuesById[20] = "ABUSIVE_EXPERIENCE_VIOLATION"] = 20;
            values[valuesById[21] = "BETTER_ADS_VIOLATION"] = 21;
            return values;
        })();

        /**
         * ThreatAttribute enum.
         * @name safe_browsing.V5.ThreatAttribute
         * @enum {number}
         * @property {number} THREAT_ATTRIBUTE_UNSPECIFIED=0 THREAT_ATTRIBUTE_UNSPECIFIED value
         * @property {number} CANARY=1 CANARY value
         * @property {number} FRAME_ONLY=2 FRAME_ONLY value
         */
        V5.ThreatAttribute = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "THREAT_ATTRIBUTE_UNSPECIFIED"] = 0;
            values[valuesById[1] = "CANARY"] = 1;
            values[valuesById[2] = "FRAME_ONLY"] = 2;
            return values;
        })();

        V5.Duration = (function() {

            /**
             * Properties of a Duration.
             * @memberof safe_browsing.V5
             * @interface IDuration
             * @property {number|Long|null} [seconds] Duration seconds
             * @property {number|null} [nanos] Duration nanos
             */

            /**
             * Constructs a new Duration.
             * @memberof safe_browsing.V5
             * @classdesc Represents a Duration.
             * @implements IDuration
             * @constructor
             * @param {safe_browsing.V5.IDuration=} [properties] Properties to set
             */
            function Duration(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Duration seconds.
             * @member {number|Long} seconds
             * @memberof safe_browsing.V5.Duration
             * @instance
             */
            Duration.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Duration nanos.
             * @member {number} nanos
             * @memberof safe_browsing.V5.Duration
             * @instance
             */
            Duration.prototype.nanos = 0;

            /**
             * Creates a new Duration instance using the specified properties.
             * @function create
             * @memberof safe_browsing.V5.Duration
             * @static
             * @param {safe_browsing.V5.IDuration=} [properties] Properties to set
             * @returns {safe_browsing.V5.Duration} Duration instance
             */
            Duration.create = function create(properties) {
                return new Duration(properties);
            };

            /**
             * Encodes the specified Duration message. Does not implicitly {@link safe_browsing.V5.Duration.verify|verify} messages.
             * @function encode
             * @memberof safe_browsing.V5.Duration
             * @static
             * @param {safe_browsing.V5.IDuration} message Duration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Duration.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Duration message, length delimited. Does not implicitly {@link safe_browsing.V5.Duration.verify|verify} messages.
             * @function encodeDelimited
             * @memberof safe_browsing.V5.Duration
             * @static
             * @param {safe_browsing.V5.IDuration} message Duration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Duration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Duration message from the specified reader or buffer.
             * @function decode
             * @memberof safe_browsing.V5.Duration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {safe_browsing.V5.Duration} Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Duration.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.safe_browsing.V5.Duration();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.seconds = reader.int64();
                            break;
                        }
                    case 2: {
                            message.nanos = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Duration message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof safe_browsing.V5.Duration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {safe_browsing.V5.Duration} Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Duration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Duration message.
             * @function verify
             * @memberof safe_browsing.V5.Duration
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Duration.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Duration message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof safe_browsing.V5.Duration
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {safe_browsing.V5.Duration} Duration
             */
            Duration.fromObject = function fromObject(object) {
                if (object instanceof $root.safe_browsing.V5.Duration)
                    return object;
                let message = new $root.safe_browsing.V5.Duration();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Duration message. Also converts values to other types if specified.
             * @function toObject
             * @memberof safe_browsing.V5.Duration
             * @static
             * @param {safe_browsing.V5.Duration} message Duration
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Duration.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Duration to JSON.
             * @function toJSON
             * @memberof safe_browsing.V5.Duration
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Duration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Duration
             * @function getTypeUrl
             * @memberof safe_browsing.V5.Duration
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Duration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/safe_browsing.V5.Duration";
            };

            return Duration;
        })();

        return V5;
    })();

    return safe_browsing;
})();

export { $root as default };
