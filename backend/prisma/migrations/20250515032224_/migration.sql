-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_productId_fkey";

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
