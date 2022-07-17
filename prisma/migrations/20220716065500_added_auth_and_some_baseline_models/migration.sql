-- CreateEnum
CREATE TYPE "SupportedCurrencies" AS ENUM ('AUD', 'USD', 'BTC', 'ETH', 'EUR');

-- CreateEnum
CREATE TYPE "ThemePreferences" AS ENUM ('LIGHT', 'DARK', 'PINK', 'WIN98');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR', 'QUARTERLY', 'DAILY');

-- CreateEnum
CREATE TYPE "IncomeType" AS ENUM ('INTEREST', 'DIVIDEND', 'DISTRIBUTION', 'MINING', 'STAKING', 'LENDING', 'RENT', 'OTHER', 'RENUMERATION');

-- CreateEnum
CREATE TYPE "PortfolioConnectionType" AS ENUM ('MANUAL_ENTRY', 'SWYFTX', 'COINSPOT', 'COINEX', 'BITCOIN', 'ETHEREUM', 'ATOM');

-- CreateEnum
CREATE TYPE "PortfolioType" AS ENUM ('CASH', 'CREDIT', 'CRYPTOCURRENCY', 'SUPERANNUATION', 'INVESTMENT', 'LOAN', 'REAL_ESTATE', 'VEHICLE', 'EMPLOYEE_COMPENSATION', 'OTHER_LIABILITY', 'OTHER_ASSET');

-- CreateEnum
CREATE TYPE "PortfolioSubType" AS ENUM ('EXCHANGE', 'HOT_WALLET', 'COLD_WALLET', 'ACCOUNT', 'ETF', 'STOCK', 'CREDIT_CARD', 'STUDENT_LOAN', 'RESIDENTIAL_REAL_ESTATE', 'COMMERCIAL_REAL_ESTATE', 'INDUSTRIAL_REAL_ESTATE');

-- CreateEnum
CREATE TYPE "PortfolioCategory" AS ENUM ('CRYPTOCURRENCY', 'ETF', 'STOCK', 'BANK', 'DEBT', 'CREDIT', 'OTHER_ASSET', 'OTHER_LIABILITY', 'PROPERTY', 'SUPERANNUATION');

-- CreateEnum
CREATE TYPE "PortfolioLabel" AS ENUM ('EXCHANGE', 'WALLET', 'BROKERAGE', 'ACCOUNT', 'BNPL', 'VEHICLE', 'MORTGAGE', 'STUDENT_LOAN', 'CREDIT_CARD', 'COMMERCIAL', 'INDUSTRIAL', 'RESIDENTIAL');

-- CreateEnum
CREATE TYPE "TransactionLabel" AS ENUM ('SWAP', 'FORK', 'GIFT', 'LOST', 'COST', 'MINING', 'REWARD', 'INCOME', 'AIRDROP', 'DIVIDEND', 'NO_LABEL', 'MARGIN_FEE', 'LIQUIDITY_IN', 'DISTRIBUTION', 'LIQUIDITY_OUT', 'LOAN_INTEREST', 'INTEREST_PAYMENT', 'REALIZED_PROFIT_LOSS');

-- CreateEnum
CREATE TYPE "BudgetCategory" AS ENUM ('INCOME', 'EXPENSE', 'SAVINGS', 'INVESTMENT', 'MEDICAL', 'FOOD', 'BILL', 'ENTERTAINMENT', 'SUBSCRIPTION', 'DIRECT_DEBIT', 'INCOME_UNCATEGORIZED', 'EXPENSE_UNCATEGORIZED');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT E'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "themePreference" "ThemePreferences" NOT NULL,
    "rtlPreferred" BOOLEAN NOT NULL,
    "sidebarOpen" BOOLEAN NOT NULL,
    "currencyPreferred" "SupportedCurrencies" NOT NULL DEFAULT E'AUD',
    "privacy" BOOLEAN NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "icon" TEXT,
    "currency" TEXT,
    "ticker" TEXT,
    "balance" DOUBLE PRECISION,
    "price" DOUBLE PRECISION,
    "priceChange24h" DOUBLE PRECISION,
    "priceChangePercentage24h" DOUBLE PRECISION,
    "priceUpdated" TIMESTAMP(3),
    "costBasis" DOUBLE PRECISION,
    "costBasisCalculated" BOOLEAN NOT NULL DEFAULT false,
    "displayName" TEXT,
    "description" TEXT,
    "name" TEXT,
    "category" "PortfolioType",
    "type" "PortfolioSubType",
    "institutionName" TEXT,
    "incomeType" "IncomeType",
    "incomeAmount" DOUBLE PRECISION,
    "incomeFrequency" "Frequency",
    "annualPercentageRate" DOUBLE PRECISION,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "connectionApiType" "PortfolioConnectionType" DEFAULT E'MANUAL_ENTRY',
    "connectionApiKey" TEXT,
    "connectionApiSecret" TEXT,
    "connectionApiWalletAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioHistory" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "snapshotDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "PortfolioHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TEXT,
    "amount" TEXT,
    "currency" TEXT,
    "label" "TransactionLabel",
    "description" TEXT,
    "txHash" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "category" "BudgetCategory",
    "currency" TEXT,
    "amount" DOUBLE PRECISION,
    "frequencyRate" DOUBLE PRECISION,
    "frequencyDuration" "Frequency",
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "recurring" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubBudget" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "category" "BudgetCategory",
    "currency" TEXT,
    "amount" DOUBLE PRECISION,
    "frequencyRate" DOUBLE PRECISION,
    "frequencyDuration" "Frequency",
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "recurring" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "budgetId" TEXT,

    CONSTRAINT "SubBudget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_id_key" ON "UserPreferences"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Note_id_key" ON "Note"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_id_key" ON "Portfolio"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioHistory_id_key" ON "PortfolioHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_id_key" ON "Budget"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubBudget_id_key" ON "SubBudget"("id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioHistory" ADD CONSTRAINT "PortfolioHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubBudget" ADD CONSTRAINT "SubBudget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubBudget" ADD CONSTRAINT "SubBudget_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE SET NULL ON UPDATE CASCADE;
