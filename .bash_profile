alias curlo='curl -w "\nLookup time:\t%{time_namelookup}\nConnect time:\t%{time_connect}\nPreXfer time:\t%{time_pretransfer}\nStartXfer time:\t%{time_starttransfer}\n\nTotal time:\t%{time_total}\n" -svo /dev/null -H Fastly-Debug:1'
alias reactr='adb shell input keyevent 82'

export PATH="/usr/local/Cellar/openssl/1.0.2o_1/bin:/usr/local/sbin:$PATH"

