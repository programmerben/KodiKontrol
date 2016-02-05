Kodi Kontrol (Stupid name I know)
=================================

## Description

I wanted to be able to control Kodi, CouchPotato, and SickRage from my Amazon Alexa. I do not want to go through the certification
program, nor would this project be accepted, so I created this repo for anyone else to use. You run this https:// server, and add
a few amazon skills, and you should be good to go.


## Quick technical notes

* You must run this as root since it runs on port 443

* This uses kodi's HTTP interface, couchpotato-api for couchpotato, and SickRage/SickBeards HTTP API

* You need to edit config.js for this to be useful!

## Instructions

### KodiKontrol Side

1. Edit config.js with your appropriate info

2. run ./bin/www as root on a server publicly accessible from port 443, and able to connect to your sickrage/couchpotato/kodi servers.


### Amazon Side

#### Sign up for an account
1) Sign up with an account at http://developer.amazon.com


#### Add Kodi Skill

1) Click "Apps & Services" in the top navigation bar.

2) Click "Alexa"

3) Click "Alexa Skills Kit"

4) Click "Add a New Skill"

5) Fill in the following fields:

Name: Kodi

Invocation Name: Kodi


Endpoint: 

(Select HTTPS)

https://yoururl.com/kodi



6) Go to "Interaction Model"


7) Put this in "Intent Schema":

```json
{
  "intents": [
    {
      "intent": "Pause",
      "slots": [
      ]
    },
    {
      "intent": "Play",
      "slots": [
        {
          "name": "Video",
          "type": "AMAZON.LITERAL"
        }
      ]
    },
    {
      "intent": "GetRecentMovies",
      "slots": [
      ]
    },
    {
      "intent": "GetRecentEpisodes",
      "slots": [
      ]
    }
  ]
}
```

8) Put this in "Sample Utterances":

Pause pause
Play play
Play play {top gun|Video}
Play watch {top gun|Video}
Play watch movie {top gun|Video}
Play open movie {top gun|Video}
GetRecentMovies get recent movies
GetRecentEpisodes get recent episodes
GetRecentEpisodes get recent tv episodes
GetRecentEpisodes get recent tv


9) Go to "SSL Certificate"


10) Click "I will upload a self-signed certificate in X.509 format"


11) Paste this in the box:

-----BEGIN CERTIFICATE-----
MIIDdDCCAlygAwIBAgIJAPp3fm8LcyrFMA0GCSqGSIb3DQEBCwUAMFgxCzAJBgNV
BAYTAlVTMQswCQYDVQQIEwJDQTEVMBMGA1UEBxMMU2FudGEgTW9uaWNhMRYwFAYD
VQQKEw1TbWFydEhvbWVTb2Z0MQ0wCwYDVQQDEwRLb2RpMB4XDTE2MDEzMTA3NDUz
N1oXDTE3MDEzMDA3NDUzN1owWDELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRUw
EwYDVQQHEwxTYW50YSBNb25pY2ExFjAUBgNVBAoTDVNtYXJ0SG9tZVNvZnQxDTAL
BgNVBAMTBEtvZGkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCkctQe
SxQEab/8hVzMLi5uEDn9FbxKja8PMbqPH6V7nai2z2FnOOcR/khd7qnHxDe/JWXu
PcjwlNO0rjZYKynxZHzJFiqUNccTy+6ynbeNCQp03N4Exw2FMVi2LOLR4rlftXGl
lCvLIbbJWPTFcDEcZXr/7n4gHqZe4+52Erg8+dBPzV2KuXZpOcQd6LmdjrN4BZHR
/MqQfQ2uDwQUashwQeWlXZzeCSCYCWlw1rJQ+JPgQVBwZbFbw8eoY86FSZcl2sUM
jrtEQQAzOa1BW6Oa61MdZhcPZL1SEis8lwD/lur8dzRnv2v+Og0jLi+sDQHMYKSq
9X/3ZHzGQ8wlU7o3AgMBAAGjQTA/MAsGA1UdDwQEAwIEMDATBgNVHSUEDDAKBggr
BgEFBQcDATAbBgNVHREEFDASghB3d3cudHJvbGxib3Qub3JnMA0GCSqGSIb3DQEB
CwUAA4IBAQBEYMZNH+0zp/csifIK5+EoMKxnALDOpZQtmJnFjkknutEtPcoElJ8q
DeMb2VebyORmd9bX7RQka4hUA5d38pZk+lbjMBmR/wdLOcfpWR+ielgsYDpimbTG
Njho6I5RC68ReWKySppS6RwH/OXbL6JuHp2vmiM32nPYM0TUs6CqpbXE1cQhmJLr
TMptFFlAnTkjYixdH9suaaAHggiXbmn/sWKtHxytCjJD6cA0cwK4GHO+ETwfGAWj
oDjabINYzBxeFxTNGb4CT27hnqy00VKLZmNZAsOet6Lrpf8F1v7in/niKl/nWqTQ
nNPqjzMWPsvL4wwBpgvLapCn7XtzlXAw
-----END CERTIFICATE-----


12) Click "Save"


#### Add Couchpotato

1) Click "Alexa" in the top navigation bar

2) Click "Alexa Skills Kit"

3) Click "Add a New Skill"

4) Fill in the following fields:

Name: Couch Potato

Invocation Name: Couch Potato


Endpoint: 

(Select HTTPS)

https://yoururl.com/couchpotato



5) Go to "Interaction Model"


6) Put this in "Intent Schema":

```json
{
  "intents": [
    {
      "intent": "Add",
      "slots": [
        {
          "name": "Movie",
          "type": "AMAZON.LITERAL"
        }
      ]
    },
    {
      "intent": "YesDownload",
      "slots": []
    },
    {
      "intent": "NoDownload",
      "slots": []
    }
  ]
}
```

7) Put this in "Sample Utterances":

Add add {top gun|Movie}
Add download {top gun|Movie}
YesDownload Yes
YesDownload Affirmative
NoDownload No
NoDownload Negative

8) Go to "SSL Certificate"


9) Click "I will upload a self-signed certificate in X.509 format"


10) Paste this in the box:

-----BEGIN CERTIFICATE-----
MIIDdDCCAlygAwIBAgIJAPp3fm8LcyrFMA0GCSqGSIb3DQEBCwUAMFgxCzAJBgNV
BAYTAlVTMQswCQYDVQQIEwJDQTEVMBMGA1UEBxMMU2FudGEgTW9uaWNhMRYwFAYD
VQQKEw1TbWFydEhvbWVTb2Z0MQ0wCwYDVQQDEwRLb2RpMB4XDTE2MDEzMTA3NDUz
N1oXDTE3MDEzMDA3NDUzN1owWDELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRUw
EwYDVQQHEwxTYW50YSBNb25pY2ExFjAUBgNVBAoTDVNtYXJ0SG9tZVNvZnQxDTAL
BgNVBAMTBEtvZGkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCkctQe
SxQEab/8hVzMLi5uEDn9FbxKja8PMbqPH6V7nai2z2FnOOcR/khd7qnHxDe/JWXu
PcjwlNO0rjZYKynxZHzJFiqUNccTy+6ynbeNCQp03N4Exw2FMVi2LOLR4rlftXGl
lCvLIbbJWPTFcDEcZXr/7n4gHqZe4+52Erg8+dBPzV2KuXZpOcQd6LmdjrN4BZHR
/MqQfQ2uDwQUashwQeWlXZzeCSCYCWlw1rJQ+JPgQVBwZbFbw8eoY86FSZcl2sUM
jrtEQQAzOa1BW6Oa61MdZhcPZL1SEis8lwD/lur8dzRnv2v+Og0jLi+sDQHMYKSq
9X/3ZHzGQ8wlU7o3AgMBAAGjQTA/MAsGA1UdDwQEAwIEMDATBgNVHSUEDDAKBggr
BgEFBQcDATAbBgNVHREEFDASghB3d3cudHJvbGxib3Qub3JnMA0GCSqGSIb3DQEB
CwUAA4IBAQBEYMZNH+0zp/csifIK5+EoMKxnALDOpZQtmJnFjkknutEtPcoElJ8q
DeMb2VebyORmd9bX7RQka4hUA5d38pZk+lbjMBmR/wdLOcfpWR+ielgsYDpimbTG
Njho6I5RC68ReWKySppS6RwH/OXbL6JuHp2vmiM32nPYM0TUs6CqpbXE1cQhmJLr
TMptFFlAnTkjYixdH9suaaAHggiXbmn/sWKtHxytCjJD6cA0cwK4GHO+ETwfGAWj
oDjabINYzBxeFxTNGb4CT27hnqy00VKLZmNZAsOet6Lrpf8F1v7in/niKl/nWqTQ
nNPqjzMWPsvL4wwBpgvLapCn7XtzlXAw
-----END CERTIFICATE-----


11) Click "Save"


#### Add SickRage/SickBeard Skill

Note: I call this "TV Assistant" since sickrage rarely triggers well for me

1) Click "Alexa" in the top navigation bar

2) Click "Alexa Skills Kit"

3) Click "Add a New Skill"

4) Fill in the following fields:

Name: SickRage

Invocation Name: TV Assistant


Endpoint: 

(Select HTTPS)

https://yoururl.com/sickrage



5) Go to "Interaction Model"


6) Put this in "Intent Schema":

```json
{
  "intents": [
    {
      "intent": "Upcoming",
      "slots": [
      ]
    },
    {
      "intent": "Download",
      "slots": [
        {
          "name": "ShowName",
          "type": "AMAZON.LITERAL"
        }
      ]
    },
    {
      "intent": "YesDownload",
      "slots": []
    },
    {
      "intent": "NoDownload",
      "slots": []
    }
  ]
}
```

7) Put this in "Sample Utterances":

Upcoming get upcoming episodes
Upcoming get upcoming
Upcoming get future shows
Upcoming get future episodes
Download download {Full House|ShowName}
Download get {Full House|ShowName}
Download add {Full House|ShowName}
YesDownload yes
YesDownload affirmative
NoDownload no
NoDownload negative

8) Go to "SSL Certificate"


9) Click "I will upload a self-signed certificate in X.509 format"


10) Paste this in the box:

-----BEGIN CERTIFICATE-----
MIIDdDCCAlygAwIBAgIJAPp3fm8LcyrFMA0GCSqGSIb3DQEBCwUAMFgxCzAJBgNV
BAYTAlVTMQswCQYDVQQIEwJDQTEVMBMGA1UEBxMMU2FudGEgTW9uaWNhMRYwFAYD
VQQKEw1TbWFydEhvbWVTb2Z0MQ0wCwYDVQQDEwRLb2RpMB4XDTE2MDEzMTA3NDUz
N1oXDTE3MDEzMDA3NDUzN1owWDELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRUw
EwYDVQQHEwxTYW50YSBNb25pY2ExFjAUBgNVBAoTDVNtYXJ0SG9tZVNvZnQxDTAL
BgNVBAMTBEtvZGkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCkctQe
SxQEab/8hVzMLi5uEDn9FbxKja8PMbqPH6V7nai2z2FnOOcR/khd7qnHxDe/JWXu
PcjwlNO0rjZYKynxZHzJFiqUNccTy+6ynbeNCQp03N4Exw2FMVi2LOLR4rlftXGl
lCvLIbbJWPTFcDEcZXr/7n4gHqZe4+52Erg8+dBPzV2KuXZpOcQd6LmdjrN4BZHR
/MqQfQ2uDwQUashwQeWlXZzeCSCYCWlw1rJQ+JPgQVBwZbFbw8eoY86FSZcl2sUM
jrtEQQAzOa1BW6Oa61MdZhcPZL1SEis8lwD/lur8dzRnv2v+Og0jLi+sDQHMYKSq
9X/3ZHzGQ8wlU7o3AgMBAAGjQTA/MAsGA1UdDwQEAwIEMDATBgNVHSUEDDAKBggr
BgEFBQcDATAbBgNVHREEFDASghB3d3cudHJvbGxib3Qub3JnMA0GCSqGSIb3DQEB
CwUAA4IBAQBEYMZNH+0zp/csifIK5+EoMKxnALDOpZQtmJnFjkknutEtPcoElJ8q
DeMb2VebyORmd9bX7RQka4hUA5d38pZk+lbjMBmR/wdLOcfpWR+ielgsYDpimbTG
Njho6I5RC68ReWKySppS6RwH/OXbL6JuHp2vmiM32nPYM0TUs6CqpbXE1cQhmJLr
TMptFFlAnTkjYixdH9suaaAHggiXbmn/sWKtHxytCjJD6cA0cwK4GHO+ETwfGAWj
oDjabINYzBxeFxTNGb4CT27hnqy00VKLZmNZAsOet6Lrpf8F1v7in/niKl/nWqTQ
nNPqjzMWPsvL4wwBpgvLapCn7XtzlXAw
-----END CERTIFICATE-----


11) Click "Save"


