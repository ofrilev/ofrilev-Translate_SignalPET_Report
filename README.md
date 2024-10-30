# Translation App

## Overview

This app allows users to change page translations among German, French, Portuguese, Spanish, and English. A dropdown menu is provided on the left side of the interface for easy language switching.

## Caching Considerations

To reduce the company's costs for translation services, I have introduced a caching mechanism on the server side. The server will cache translated copies in its memory to avoid translating the same report multiple times. Only if the report does not exist in the cache, a request will be sent to the translation service.

Worth mentioning, another solution could be considered here: local storage. Using the cache has its drawbacks; when the service gets restarted, all the cached results will be deleted. However, this solution comes with the additional cost of storage.

To optimize client speed and reduce the load on the server, the client also uses caching.

Another important consideration when using caching is the caching policy. To make the most of our resources, we should analyze our system to find the best caching policy that fits our needs, such as Least Frequently Used (LFU) or Least Recently Used (LRU), among others.

### Installation

1. **Clone the main repository:**
   ```bash
   git clone https://github.com/ofrilev/ofrilev-Translate_SignalPET_Report.git
   cd ofrilev-Translate_SignalPET_Report
   ```
2. Clone the repository:

   ```bash
    git clone https://github.com/LibreTranslate/LibreTranslate.git
   ```

3. Navigate to the LibreTranslate directory and run the service:
   ```bash
   cd LibreTranslate
    ./start --load-only en,es,de,pt,fr
   ```
4. Navigate to the server directory and run the server:

   ```bash
   cd ../server
   bun run dev
   ```

5. enter in browser http://localhost:8081/
   for running only client. run cd /client and than run: npm run start
   if you want to do any changes for prod:
   Take the contents of the build directory and place them in a directory named app under /server/src.
