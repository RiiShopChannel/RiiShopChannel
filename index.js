var express = require('express');

const mustache = require('mustache-express')

var http = require('http');
var https = require('https');
var fs = require('fs');

var titles = [
    {
        "titleName": "Test1",
        "publisher": "Test Publisher",
        "releaseDate": "10-11-2002",
        "category": "Platformer",
        "playerCount": "1",
        "titleRating": "E",
        "titleRatingDesc": "Test",
        "titleRatingCompany": "esrb",
        "platform": "NES",
        "titleUrl": "https://static.wikia.nocookie.net/ttgd/images/5/56/New_Super_Mario_Bros._Wii.jpg",
        "costOfTitle": "500"
    },
    {
        "titleName": "Test1",
        "publisher": "Test Publisher",
        "releaseDate": "10-11-2002",
        "category": "Platformer",
        "playerCount": "1",
        "titleRating": "E",
        "titleRatingDesc": "Test",
        "titleRatingCompany": "esrb",
        "platform": "NES",
        "titleUrl": "https://static.wikia.nocookie.net/ttgd/images/5/56/New_Super_Mario_Bros._Wii.jpg",
        "costOfTitle": "500"
    },
    {
        "titleName": "Test1",
        "publisher": "Test Publisher",
        "releaseDate": "10-11-2002",
        "category": "Platformer",
        "playerCount": "1",
        "titleRating": "E",
        "titleRatingDesc": "Test",
        "titleRatingCompany": "esrb",
        "platform": "NES",
        "titleUrl": "https://static.wikia.nocookie.net/ttgd/images/5/56/New_Super_Mario_Bros._Wii.jpg",
        "costOfTitle": "500"
    },
    {
        "titleName": "Test1",
        "publisher": "Test Publisher",
        "releaseDate": "10-11-2002",
        "category": "Platformer",
        "playerCount": "1",
        "titleRating": "E",
        "titleRatingDesc": "Test",
        "titleRatingCompany": "esrb",
        "platform": "NES",
        "titleUrl": "https://static.wikia.nocookie.net/ttgd/images/5/56/New_Super_Mario_Bros._Wii.jpg",
        "costOfTitle": "500"
    },
    {
        "titleName": "Test1",
        "publisher": "Test Publisher",
        "releaseDate": "10-11-2002",
        "category": "Platformer",
        "playerCount": "1",
        "titleRating": "E",
        "titleRatingDesc": "Test",
        "titleRatingCompany": "esrb",
        "platform": "NES",
        "titleUrl": "https://static.wikia.nocookie.net/ttgd/images/5/56/New_Super_Mario_Bros._Wii.jpg",
        "costOfTitle": "500"
    }
];

var options = {
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.pem'),

    minVersion: 'TLSv1',
    maxVersion: 'TLSv1',

    ciphers: 'ALL:@SECLEVEL=0'
};

var app = express();

app.engine('mustache', mustache())
app.set("view engine", "mustache")

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

app.use(express.static("static"));

// Wii Shop Channel - Connecting
app.get('/', (req, res) => {
    res.render("connecting.ejs", {});
});

// Wii Shop Channel - Start Page
app.get('/firstpage', (req, res) => {
    res.render("W_01.ejs", {});
});

/**
 * Wii Shop Channel - Start Page - News
 */
app.get('/news01', (req, res) => {
    res.render("news1.ejs", {});
});

app.get('/news1txt', (req, res) => {
    res.render("news1txt.ejs");
});

app.get('/news02', (req, res) => {
    res.render("news2.ejs", {});
});

app.get('/news2txt', (req, res) => {
    res.render("news2txt.ejs");
});

app.get('/news03', (req, res) => {
    res.render("news3.ejs", {});
});

app.get('/news3txt', (req, res) => {
    res.render("news3txt.ejs");
});

app.get('/news04', (req, res) => {
    res.render("news4.ejs", {});
});

app.get('/news4txt', (req, res) => {
    res.render("news4txt.ejs");
});

/**
 * Wii Shop Channel - Home Page
 */
app.get('/homepage', (req, res) => {
    res.render("W_03.ejs", { pts:'1000'});
});

/**
 * Wii Shop Channel - Virtual Channel
 */
app.get('/vchome', (req, res) => {
    res.render("B_01.ejs", { pts:'1000'});
});

/**
 * Wii Shop Channel - WiiWare
 */
app.get('/wwhome', (req, res) => {
    res.render("B_27.ejs", { pts:'1000'});
});

/**
 * Wii Shop Channel - Channels
 */
app.get('/channels', (req, res) => {
    var popular = req.query.popular;
    var p = req.query.p;
    var vc = req.query.vc;
    var order = req.query.order;
    var platform = req.query.platform;

    var titlesPageName = "";

    if (popular === "true" && p === "1" && vc === "true") {
        console.log("Virtual Console - Popular Titles")

        titlesPageName = "Virtual Console";
    } 
    
    if (order === "new" && p === "1" && vc === "true") {
        console.log("Virtual Console - Newest")

        titlesPageName = "Virtual Console";
    }
    
    if (popular === "true" && p === "1" && platform === "WIIWARE;") {
        console.log("WiiWare - Popular Titles")

        titlesPageName = "WiiWare";
    }

    if (order === "new" && p === "1" && platform === "WIIWARE") {
        console.log("WiiWare - Newest")

        titlesPageName = "WiiWare";
    }

    if (popular === undefined && order === undefined && p === undefined && platform === undefined) {
        console.log("Channels")

        titlesPageName = "Channels";
    }

    res.render("B_04.ejs", { pts:'1000', titlesPageName: titlesPageName, titles: titles });
});

/**
 * Wii Shop Channel - Virtual Console - Search
 */
app.get('/VCSBC', (req, res) => {
    res.render("search_VC_by_catagory.ejs", { pts:'1000'});
});

app.get('/VCSBS', (req, res) => {
    res.render("search_VC_by_system.ejs", { pts:'1000'});
});

app.get('/VCSBP', (req, res) => {
    res.render("search_VC_by_publish.ejs", { pts:'1000'});
});

app.get('/VCSBG', (req, res) => {
    res.render("search_VC_by_genre.ejs", { pts:'1000'});
});

/**
 * Wii Shop Channel - WiiWare - Search
 */
app.get('/WWSBP', (req, res) => {
    res.render("search_WW_by_publish.ejs", { pts:'1000'});
});

app.get('/WWSBG', (req, res) => {
    res.render("search_WW_by_genre.ejs", { pts:'1000'});
});


/**
 * Wii Shop Channel - Title Details
 */
app.get('/titleinfopage', (req, res) => {
    var titleId = req.query.title;

    res.render("B_05.ejs", { pts:'1000', titleId: titleId, titles: titles });
});

/**
 * Wii Shop Channel - More Details
 */
app.get('/B_06', (req, res) => {
    res.render("B_06.ejs", { pts:'1000'});
});

/**
 * Wii Shop Channel - Rating Information
 */
app.get('/B_07', (req, res) => {
    res.render("B_07.ejs", { pts:'1000'});
});

/**
 * Wii Shop Channel - ??????????????
 */
app.get('/B_08', (req, res) => {
    res.render("B_08.ejs", { pts:'1000'});
});

/**
 * Wii Shop Channel - Download Confirmation
 */
app.get('/B_09', (req, res) => {
    res.render("B_09.ejs", { pts:'1000'});
});

/**
 * Wii Shop Channel - Download Software
 */
app.get('/B_10', (req, res) => {
    res.render("B_10.ejs", { pts:'1000'});
});

// Wii Shop Channel - Settings
app.get('/settings', (req, res) => {
    res.render("S_01.ejs", { pts:'1000'});
});

/**
 * Wii Shop Channel - Settings - Club Nintendo Membership Settings
 */
app.get('/linkclubacc', (req, res) => {
    res.render("linkclubtendo.ejs");
});

/**
 * Wii Shop Channel - Settings - Connection Ambassador
 */
app.get('/connectionambassadormainpage', (req, res) => {
    res.render("S_16.ejs");
});

app.get('/connectionambassadorhelper', (req, res) => {
    res.render("S_helper.ejs");
});

app.get('/connectionambassadorhelped', (req, res) => {
    res.render("S_helped.ejs");
});

app.get('/connectionambassadorstatuscheck', (req, res) => {
    res.render("S_checkfcstatus.ejs");
});

/**
 * Wii Shop Channel - Settings - Gift Settings
 */
app.get('/S_12', (req, res) => {
    res.render("S_12.ejs", { pts:'1000'});
});

app.get('/giftselectfriend', (req, res) => {
    res.render("selectgiftmii.ejs");
});

app.get('/settingswiiticket', (req, res) => {
    res.render("S_14.ejs");
})

/**
 * Wii Shop Channel - Settings - Shopping Guide
 */
app.get('/shopguide', (req, res) => {
    res.render("shoppingguide/startup.ejs");
});

app.get('/ukv/page_01/page_01.html', (req, res) => {
    res.render("shoppingguide/ukv/page_01/page_01.ejs");
});

app.get('/ukv/page_02/page_02.html', (req, res) => {
    res.render("shoppingguide/ukv/page_02/page_02.ejs");
});

app.get('/ukv/page_03/page_03.html', (req, res) => {
    res.render("shoppingguide/ukv/page_03/page_03.ejs");
});

app.get('/ukv/page_04/page_04.html', (req, res) => {
    res.render("shoppingguide/ukv/page_04/page_04.ejs");
});

app.get('/ukv/page_05/page_05.html', (req, res) => {
    res.render("shoppingguide/ukv/page_05/page_05.ejs");
});

app.get('/ukv/page_06/page_06.html', (req, res) => {
    res.render("shoppingguide/ukv/page_06/page_06.ejs");
});

app.get('/ukv/page_07/page_07.html', (req, res) => {
    res.render("shoppingguide/ukv/page_07/page_07.ejs");
});

app.get('/ukv/page_08/page_08.html', (req, res) => {
    res.render("shoppingguide/ukv/page_08/page_08.ejs");
});

app.get('/ukv/page_09/page_09.html', (req, res) => {
    res.render("shoppingguide/ukv/page_09/page_09.ejs");
});

app.get('/ukv/page_10/page_10.html', (req, res) => {
    res.render("shoppingguide/ukv/page_10/page_10.ejs");
});

app.get('/ukv/page_11/page_11.html', (req, res) => {
    res.render("shoppingguide/ukv/page_11/page_11.ejs");
});

app.get('/ukv/page_12/page_12.html', (req, res) => {
    res.render("shoppingguide/ukv/page_12/page_12.ejs");
});