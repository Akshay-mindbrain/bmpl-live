"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
user;
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema
// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init
generator;
client;
{
    provider = "prisma-client-js";
}
datasource;
db;
{
    provider = "mysql";
    url = env("DATABASE_URL");
}
var Status;
(function (Status) {
    Status[Status["ACTIVE"] = 0] = "ACTIVE";
    Status[Status["INACTIVE"] = 1] = "INACTIVE";
})(Status || (Status = {}));
var LegPosition;
(function (LegPosition) {
    LegPosition[LegPosition["LEFT"] = 0] = "LEFT";
    LegPosition[LegPosition["RIGHT"] = 1] = "RIGHT";
})(LegPosition || (LegPosition = {}));
var KycStatus;
(function (KycStatus) {
    KycStatus[KycStatus["PENDING"] = 0] = "PENDING";
    KycStatus[KycStatus["APPROVED"] = 1] = "APPROVED";
    KycStatus[KycStatus["REJECT"] = 2] = "REJECT";
})(KycStatus || (KycStatus = {}));
var AdminType;
(function (AdminType) {
    AdminType[AdminType["SUPERADMIN"] = 0] = "SUPERADMIN";
    AdminType[AdminType["ADMIN"] = 1] = "ADMIN";
    AdminType[AdminType["MANAGER"] = 2] = "MANAGER";
})(AdminType || (AdminType = {}));
var PurchaseType;
(function (PurchaseType) {
    PurchaseType[PurchaseType["FIRST_PURCHASE"] = 0] = "FIRST_PURCHASE";
    PurchaseType[PurchaseType["REPURCHASE"] = 1] = "REPURCHASE";
    PurchaseType[PurchaseType["SHARE_PURCHASE"] = 2] = "SHARE_PURCHASE";
})(PurchaseType || (PurchaseType = {}));
var IncomeGenerated;
(function (IncomeGenerated) {
    IncomeGenerated[IncomeGenerated["NO"] = 0] = "NO";
})(IncomeGenerated || (IncomeGenerated = {}));
YES;
var MemIdOption;
(function (MemIdOption) {
    MemIdOption[MemIdOption["STATIC"] = 0] = "STATIC";
})(MemIdOption || (MemIdOption = {}));
DYNAMIC;
var ApproveStatus;
(function (ApproveStatus) {
    ApproveStatus[ApproveStatus["AUTO"] = 0] = "AUTO";
})(ApproveStatus || (ApproveStatus = {}));
MANUALADMIN;
var ShareStatus;
(function (ShareStatus) {
    ShareStatus[ShareStatus["NOT_APPLICABLE"] = 0] = "NOT_APPLICABLE";
    ShareStatus[ShareStatus["AVAILABLE"] = 1] = "AVAILABLE";
    ShareStatus[ShareStatus["RESERVED"] = 2] = "RESERVED";
    ShareStatus[ShareStatus["TRANSFERRED"] = 3] = "TRANSFERRED";
    ShareStatus[ShareStatus["EXPIRED"] = 4] = "EXPIRED";
})(ShareStatus || (ShareStatus = {}));
var PurchaseStatus;
(function (PurchaseStatus) {
    PurchaseStatus[PurchaseStatus["PENDING"] = 0] = "PENDING";
    PurchaseStatus[PurchaseStatus["APPROVED"] = 1] = "APPROVED";
    PurchaseStatus[PurchaseStatus["REJECTED"] = 2] = "REJECTED";
})(PurchaseStatus || (PurchaseStatus = {}));
model;
Admin;
{
    id;
    Int;
    (autoincrement());
    firstName;
    String ? 
        :
    ;
    lastName;
    String ? 
        :
    ;
    mobileOne;
    String ? 
        :
    ;
    mobileTwo;
    String ? 
        :
    ;
    email;
    String ? 
        :
    ;
    pinCode;
    String ? 
        :
    ;
    country;
    String ? 
        :
    ;
    state;
    String ? 
        :
    ;
    address;
    String ? 
        :
    ;
    username;
    String;
    password;
    String;
    profileImage;
    String ? 
        :
    ;
    adminType;
    AdminType;
    accessToken;
    String ? 
        :
    ;
    refreshToken;
    String ? 
        :
    ;
    status;
    Status;
    (ACTIVE);
    createdAt;
    DateTime;
    (now());
    createdBy;
    String ? 
        :
    ;
    updatedAt;
    DateTime;
    updatedBy;
    String ? 
        :
    ;
    // USER audit
    createdUsers;
    User[];
    updatedUsers;
    User[];
    // KYC audit
    kycCreated;
    Kyc[];
    kycUpdated;
    Kyc[];
    kycApproved;
    Kyc[];
    // PlansMaster audit
    createdPlans;
    PlansMaster[];
    updatedPlans;
    PlansMaster[];
    approvedPlanPurchases;
    PlanPurchase[];
    // Logs
    loginHistory;
    AdminLoginHistory[];
    activityLogs;
    AdminActivityLog[];
    userActivityLogs;
    UserActivityLog[];
    //plan_purchases
    approvedPlanPurchases;
    PlanPurchase[];
}
model;
User;
{
    id;
    Int;
    (autoincrement());
    firstName;
    String;
    lastName;
    String;
    mobile;
    String;
    email;
    String;
    password;
    String;
    sponsorId;
    Int ?
        parentId : ;
    Int ?
        memberId : ;
    String ? 
        :
    ;
    legPosition;
    LegPosition ?
        leftChildId : ;
    Int ?
        rightChildId : ;
    Int ?
        lastLeftId : ;
    Int ?
        lastRightId : ;
    Int ?
        lineagePath : ;
    String;
    directCount;
    Int;
    (0);
    kycStatus;
    KycStatus;
    (PENDING);
    status;
    Status;
    (ACTIVE);
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
    createdBy;
    String ?
        updatedBy : ;
    String ?
        sponsor : ;
    User ? 
        :
    ;
    sponsoredUsers;
    User[];
    parent;
    User ? 
        :
    ;
    children;
    User[];
    leftChild;
    User ? 
        :
    ;
    leftChildren;
    User[];
    rightChild;
    User ? 
        :
    ;
    rightChildren;
    User[];
    lastLeft;
    User ? 
        :
    ;
    lastLeftUsers;
    User[];
    lastRight;
    User ? 
        :
    ;
    lastRightUsers;
    User[];
    refreshToken;
    String ? 
        :
    ;
    uId;
    Int ? 
        :
    ;
    createdByAdminId;
    Int ?
        updatedByAdminId : ;
    Int ?
        createdByAdmin : ;
    Admin ? 
        :
    ;
    updatedByAdmin;
    Admin ? 
        :
    ;
    planPurchases;
    PlanPurchase[];
    closureSponsor;
    UserTreeClosure[];
    closureParent;
    UserTreeClosure[];
    closureMember;
    UserTreeClosure[];
    kyc;
    Kyc ?
        userActivities : ;
    UserActivityLog[];
    boughtBVLedgers;
    BVLedger[];
    receivedBVLedgers;
    BVLedger[];
    royalQualifiedUser;
    RoyalQualifier[];
    royalQualifiedChildren;
    RoyalQualifier[];
    SystemIncome;
    SystemIncome[];
    wallets;
    Wallet[];
    IncomeHistory;
    IncomeHistory[];
    RewardHistory;
    RewardHistory[];
    WalletTransaction;
    WalletTransaction[];
    royalClubIncome;
    RoyalClubIncome[];
    royalQualifiersAsUser;
    RoyalQualifier[];
    royalQualifiersAsChild;
    RoyalQualifier[];
    UsersPayoutHistory;
    UsersPayoutHistory[];
}
model;
Kyc;
{
    id;
    Int;
    (autoincrement());
    userId;
    Int;
    aadharNo;
    String;
    aadharImgUrl;
    String;
    panNo;
    String;
    panImageUrl;
    String;
    bankName;
    String;
    accountNo;
    String;
    ifscCode;
    String;
    branchName;
    String;
    bankProofImgUrl;
    String;
    status;
    KycStatus;
    (PENDING);
    rejectReason;
    String ?
        createdAt : ;
    DateTime;
    (now());
    updatedAt;
    DateTime;
    createdBy;
    String ?
        updatedBy : ;
    String ?
        user : ;
    User;
    createdByAdminId;
    Int ?
        updatedByAdminId : ;
    Int ?
        approvedByAdminId : ;
    Int ?
        createdByAdmin : ;
    Admin ? 
        :
    ;
    updatedByAdmin;
    Admin ? 
        :
    ;
    approvedByAdmin;
    Admin ? 
        :
    ;
}
model;
PlansMaster;
{
    id;
    String;
    (uuid());
    planName;
    String;
    Description;
    String;
    BV;
    Float;
    price;
    Float;
    dp_amount;
    Float;
    status;
    Status;
    (ACTIVE);
    features;
    Json;
    // dailyCap              Float
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
    createdBy;
    String ?
        updatedBy : ;
    String ?
        createdByAdminId : ;
    Int ?
        updatedByAdminId : ;
    Int ?
        createdByAdmin : ;
    Admin ? 
        :
    ;
    updatedByAdmin;
    Admin ? 
        :
    ;
    purchases;
    PlanPurchase[];
    royalConfigs;
    Config[];
    //previously package
}
model;
UserActivityLog;
{
    id;
    Int;
    (autoincrement());
    userId;
    Int ?
        adminId : ;
    Int;
    action;
    String;
    details;
    String ? 
        :
    ;
    createdAt;
    DateTime;
    (now());
    user;
    User ? 
        :
    ;
    admin;
    Admin;
}
model;
AdminActivityLog;
{
    id;
    Int;
    (autoincrement());
    adminId;
    Int;
    action;
    String;
    entity;
    String;
    entityId;
    String;
    oldData;
    Json ?
        newData : ;
    Json ?
        meta : ;
    Json ?
        createdAt : ;
    DateTime;
    (now());
    admin;
    Admin;
}
model;
AdminLoginHistory;
{
    id;
    Int;
    (autoincrement());
    adminId;
    Int;
    ipAddress;
    String ?
        userAgent : ;
    String ?
        loginTime : ;
    DateTime;
    (now());
    logoutTime;
    DateTime ?
        admin : ;
    Admin;
}
model;
PlanPurchase;
{
    id;
    Int;
    (autoincrement());
    plan_id;
    String;
    plan;
    PlansMaster;
    user_id;
    Int;
    user;
    User;
    BV;
    Float;
    dp_amount;
    Float;
    plan_amount;
    Float;
    payment_mode;
    String ?
        payment_proof_uri : ;
    String ?
        purchase_type : ;
    PurchaseType;
    status;
    PurchaseStatus;
    (PENDING);
    approve_status;
    ApproveStatus;
    (AUTO);
    approved_by;
    Int ?
        approvedByAdmin : ;
    Admin ? 
        :
    ;
    approved_at;
    DateTime ?
        is_income_generated : ;
    IncomeGenerated;
    (NO);
    is_transferable;
    Boolean;
    (false);
    share_status;
    ShareStatus;
    (NOT_APPLICABLE);
    transferred_to_user_id;
    Int ? 
        :
    ;
    transferred_at;
    DateTime ?
        parent_purchase_id : ;
    Int ?
        parentPurchase : ;
    PlanPurchase ? 
        :
    ;
    childTransfers;
    PlanPurchase[];
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
    createdBy;
    String;
    updatedBy;
    String;
    bvLedgers;
    BVLedger[];
}
model;
Config;
{
    id;
    Int;
    (autoincrement());
    autoMemId;
    MemIdOption;
    (STATIC);
    userRegistrationNo;
    Int;
    (0);
    prefixMemId;
    String;
    minLength;
    Int;
    plan_config_key;
    String;
    plan_config_value;
    ApproveStatus;
    royalQualifierPlans;
    PlansMaster[];
    createdAt;
    DateTime;
    (now());
}
model;
BVLedger;
{
    id;
    Int;
    (autoincrement());
    purchase_id;
    Int;
    purchase;
    PlanPurchase;
    buyer_id;
    Int;
    buyer;
    User;
    user_id;
    Int; //1,2,4 ... [from lineage paths ]
    user;
    User;
    bv;
    Float;
    purchase_type;
    PurchaseType;
    buyer_leg;
    LegPosition ?
        is_income_generated : ;
    IncomeGenerated;
    (NO);
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
}
model;
UserTreeClosure;
{
    id;
    Int;
    (autoincrement());
    sponsorId;
    Int;
    parentId;
    Int;
    memberId;
    Int;
    legPosition;
    LegPosition;
    createdAt;
    DateTime;
    (now());
    sponsor;
    User;
    parent;
    User;
    member;
    User;
}
model;
RoyalQualifier;
{
    id;
    Int;
    (autoincrement());
    userId;
    Int;
    childId;
    Int;
    createdAt;
    DateTime;
    (now());
    user;
    User;
    child;
    User;
}
model;
SystemIncome;
{
    id;
    Int;
    (autoincrement());
    user_id;
    Int;
    user;
    User;
    matched_bv;
    Int;
    income;
    Decimal;
    message_data;
    String ?
        status : ;
    Status;
    (ACTIVE);
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
    createdBy;
    String ?
        updatedBy : ;
    String ?
        :
    ;
}
model;
Wallet;
{
    id;
    Int;
    (autoincrement());
    user_id;
    Int;
    user;
    User;
    total_income;
    Decimal;
    (0);
    total_withdraw;
    Decimal;
    (0);
    total_dp_amount;
    Decimal;
    (0);
    balance_dp_amount;
    Decimal;
    (0);
    super_coins;
    Decimal;
    (0);
    used_super_coins;
    Decimal;
    (0);
    matched_bv;
    Int;
    (0);
    total_left_bv;
    Int;
    (0);
    total_right_bv;
    Int;
    (0);
    left_carryforward_bv;
    Int;
    (0);
    right_carryforward_bv;
    Int;
    (0);
    status;
    Status;
    (ACTIVE);
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
    createdBy;
    String ?
        updatedBy : ;
    String ?
        :
    ;
}
model;
WalletTransaction;
{
    id;
    Int;
    (autoincrement());
    user_id;
    Int;
    user;
    User;
    Decimal;
    reference_id;
    Int ?
        message : ;
    String ?
        status : ;
    WalletTransactionStatus;
    (ACTIVE);
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
    createdBy;
    String ?
        updatedBy : ;
    String ?
        :
    ;
}
model;
RoyalClubIncome;
{
    id;
    Int;
    (autoincrement());
    user_id;
    Int;
    user;
    User;
    generateIncomeId;
    Int ?
        generateIncome : ;
    GenerateIncome ? 
        :
    ;
    income;
    Decimal;
    message_data;
    String ?
        status : ;
    Status;
    (ACTIVE);
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
    createdBy;
    String ?
        updatedBy : ;
    String ?
        :
    ;
}
model;
Payout;
{
    id;
    Int;
    (autoincrement());
    payoutDate;
    DateTime;
    payoutCycle;
    String;
    totalAmount;
    Decimal;
    tds;
    Decimal;
    adminCharges;
    Decimal;
    netAmount;
    Decimal;
    remarks;
    String ?
        status : ;
    Status;
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
    createdBy;
    String ?
        updatedBy : ;
    String ?
        usersHistory : ;
    UsersPayoutHistory[];
}
model;
UsersPayoutHistory;
{
    id;
    Int;
    (autoincrement());
    userId;
    Int;
    payoutId;
    Int;
    totalAmount;
    Decimal;
    tdsAmount;
    Decimal;
    adminCharges;
    Decimal;
    netAmount;
    Decimal;
    status;
    Status;
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
    createdBy;
    String ?
        updatedBy : ;
    String ?
        user : ;
    User;
    payout;
    Payout;
}
model;
GenerateIncome;
{
    id;
    Int;
    (autoincrement());
    totalIncome;
    Decimal;
    netincome;
    Float;
    (0);
    tds;
    Decimal;
    adminCharges;
    Decimal;
    generatedDate;
    DateTime;
    createdAt;
    DateTime;
    (now());
    systemIncomes;
    SystemIncome[];
    royaltyIncomes;
    RoyalClubIncome[];
    IncomeHistory;
    IncomeHistory[];
}
model;
IncomeHistory;
{
    id;
    Int;
    (autoincrement());
    incomeId;
    Int;
    generateIncome;
    GenerateIncome;
    userId;
    Int;
    user;
    User;
    totalIncome;
    Decimal;
    tds;
    Decimal;
    adminCharges;
    Decimal;
    createdAt;
    DateTime;
    (now());
}
model;
RewardConfig;
{
    id;
    Int;
    (autoincrement());
    matchedBV;
    Int;
    giftName;
    String;
    status;
    Status;
    (ACTIVE);
    rewardHistory;
    RewardHistory[];
}
model;
RewardHistory;
{
    id;
    Int;
    (autoincrement());
    userId;
    Int;
    rewardId;
    Int;
    matchedBV;
    Int;
    giftName;
    String ?
        createdAt : ;
    DateTime;
    (now());
    user;
    User;
    reward;
    RewardConfig;
}
//# sourceMappingURL=rahulscema.js.map