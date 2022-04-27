URL=172.21.96.1:3000
npx autocannon $URL -m POST\
  --warmup [-c 1 -d 3]\
  --connections 500 \
  --pipeline 10\
  --renderStatusCodes