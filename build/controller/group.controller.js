"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupController = void 0;
var db_1 = __importDefault(require("../db/db"));
var GroupController = /** @class */ (function () {
    function GroupController() {
    }
    GroupController.prototype.createGroup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, owner_id, owner, newGroup, _;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, owner_id = _a.owner_id;
                        return [4 /*yield*/, db_1.default.pool.query("SELECT * from client where id = $1", [owner_id])];
                    case 1:
                        owner = _b.sent();
                        return [4 /*yield*/, db_1.default.pool.query("INSERT INTO tgroup (title, owner_id) values ($1, $2) RETURNING *", [title, owner_id])];
                    case 2:
                        newGroup = _b.sent();
                        newGroup.rows[0].clients = [owner.rows[0]];
                        res.json(newGroup.rows[0]);
                        return [4 /*yield*/, db_1.default.pool.query("INSERT INTO tgroup_clients_id (client_id, tgroup_id) values ($1, $2) RETURNING *", [owner_id, newGroup.rows[0].id])];
                    case 3:
                        _ = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupController.prototype.getGroupsByClientId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var client_id, groupsIdRow, groupsId, groups, groupsMap, _loop_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client_id = req.query.client_id;
                        return [4 /*yield*/, db_1.default.pool.query("SELECT * from tgroup_clients_id where client_id = $1", [client_id])];
                    case 1:
                        groupsIdRow = _a.sent();
                        groupsId = groupsIdRow.rows.map(function (row) { return (row.tgroup_id); });
                        return [4 /*yield*/, db_1.default.pool.query("SELECT * from tgroup where id = ANY ($1)", [groupsId])];
                    case 2:
                        groups = _a.sent();
                        groupsMap = groups.rows.map(function (group) { return (__assign(__assign({}, group), { clients: [] })); });
                        _loop_1 = function (i) {
                            var groupLocal, clients, clientsMap;
                            var _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, db_1.default.pool.query("SELECT * from tgroup_clients_id where tgroup_id = $1", [groupsMap[i].id])];
                                    case 1:
                                        groupLocal = _c.sent();
                                        return [4 /*yield*/, db_1.default.pool.query("SELECT * from client where id = ANY ($1)", [groupLocal.rows.map(function (group) { return (group.client_id); })])];
                                    case 2:
                                        clients = _c.sent();
                                        clientsMap = clients.rows.map(function (client) {
                                            delete client.password;
                                            return client;
                                        });
                                        (_b = groupsMap.find(function (group) { return group.id === groupsMap[i].id; }).clients).push.apply(_b, clientsMap);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < groupsMap.length)) return [3 /*break*/, 6];
                        return [5 /*yield**/, _loop_1(i)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        res.json(groupsMap);
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupController.prototype.deleteGroup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _, tgroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id;
                        return [4 /*yield*/, db_1.default.pool.query("DELETE FROM tgroup_clients_id where tgroup_id = $1", [id])];
                    case 1:
                        _ = _a.sent();
                        return [4 /*yield*/, db_1.default.pool.query("DELETE FROM tgroup where id = $1 RETURNING *", [id])];
                    case 2:
                        tgroup = _a.sent();
                        res.json(tgroup.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    return GroupController;
}());
exports.groupController = new GroupController();
