echo "-----------Build for ef-nl START-----------"
rm -rf build
rm -rf build.tar.gz
npm run-script build
tar -zcvf build.tar.gz build
echo "-----------Build for ef-nl END-----------"
