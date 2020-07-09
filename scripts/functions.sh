grep -E "^function [a-zA-Z]+ \(" src/js/*.js  > scripts/all-functions.txt
node scripts/function-calls > scripts/hop.dot
neato -Tjpg scripts/hop.dot > scripts/function-calls.jpg
