# AI-Bot
AI-Bot For Whatsapp


## Deploy On Linux
```
-- Install Requirement
apt update -y; apt upgrade -y; apt install screen nodejs npm nano wget sudo -y
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt --fix-broken install ./google-chrome-stable_current_amd64.deb

-- Install AI-Bot
git clone https://github.com/wildy8088/AI-Bot.git
screen -S AI-Bot
cd AI-Bot
npm install
npm start
```
