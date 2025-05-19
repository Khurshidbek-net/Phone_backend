-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('PAYME', 'CLICK', 'PAYNET');

-- AlterTable
ALTER TABLE "Phone" ADD COLUMN     "addressId" INTEGER,
ALTER COLUMN "views" DROP NOT NULL,
ALTER COLUMN "views" SET DEFAULT 0,
ALTER COLUMN "like_counts" DROP NOT NULL,
ALTER COLUMN "like_counts" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "type" "PaymentType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paid_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "sellerId" INTEGER,
    "buyerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "phoneId" INTEGER,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL,
    "senderId" INTEGER,
    "chatId" INTEGER,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "is_creator" BOOLEAN DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "refresh_token" TEXT,
    "last_login" TIMESTAMP(3),
    "login_attempts" INTEGER,
    "locked_until" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favourites" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "phoneId" INTEGER,

    CONSTRAINT "Favourites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_number_key" ON "Admin"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_hashed_password_key" ON "Admin"("hashed_password");

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;
