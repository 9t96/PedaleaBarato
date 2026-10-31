-- AddForeignKey
ALTER TABLE "Bicycle" ADD CONSTRAINT "Bicycle_retailerId_fkey" FOREIGN KEY ("retailerId") REFERENCES "Retailers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
