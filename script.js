let folder;


async function getsongs(folder) {
    const a = await fetch(`/${folder}/`)
    const response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    let songs = []
    for (i = 0; i < as.length; i++) {
        let element = as[i]
        if (element.href.endsWith(".mp3") || element.href.endsWith(".m4a")) {
            // it give array of left and right part of string about /songs 
            songs.push((element.href.split("/")).slice(-1)[0])
        }
    }
    return songs
}
function musiclistandplay(folder, songs) {
    path = `/${folder}/` + songs[0]
    currentsong.src = path
    document.querySelector(".mar").innerHTML = songs[0]
    // displaying the music names  to web so that user can click or interact
    for (const song of songs) {
        song1 = song
        let ul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
        ul.innerHTML += `<li>${song1}</li>`
    }
    // adding eventlisner to each of the music in targeted folder
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", (element) => {
            path = `/${folder}/` + e.innerHTML
            currentsong.src = path
            currentsong.play()
            document.querySelector(".songplay").innerHTML = `<img src="images/play2.svg" alt="">`
            document.querySelector(".mar").innerHTML = e.innerHTML
        }
        )
    })

}




// from here
let ar = [];
async function displayalbum() {
    const a = await fetch(`/songs/`)
    const response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let anchors = div.getElementsByTagName("a")
    let anchorsarray = Array.from(anchors)
    console.log(anchorsarray);

    for (let i = 0; i < anchorsarray.length; i++) {
        let e = anchorsarray[i]
        if (e.href.includes("/songs/")) {
            let foldername = e.href.split("/").slice(-2)[0]
            ar.push(foldername)
            let a = await fetch(`/songs/${foldername}/info.json`)
            let info = await a.json()
            // foldername=e.href.split("/").slice(-2)[0]
            let album = `<div data-folder="${foldername}" class="card">
                    <div class="play"><img src="images/play.svg" alt=""></div>
                    <img src="songs/${foldername}/cover.jpeg" alt="">
                    <div>${info.title}</div>
                    <div>${info.Description}</div>
                </div>`
            document.querySelector(".music").innerHTML += album
        }    }



    Array.from(document.getElementsByClassName("card")).forEach((e) => {
        e.addEventListener("click", async (item) => {
            // item.target will give where you click that is on Image, paragram , heading etc
            // but currenttartget will give when you click on addEventListener element
            // console.log(item.target);
            currentfoldername = item.currentTarget.dataset.folder
            // console.log(currentfoldername);    
            folder = folder.split("/")[0] + "/" + currentfoldername
            songs = await getsongs(folder)
           console.log(`/${folder}/${songs[0]}`);    
            document.querySelector(".songlist").getElementsByTagName("ul")[0].innerHTML = ""
            musiclistandplay(folder, songs)
            playmusic(`/${folder}/${songs[0]}`)
            console.log(document.querySelector(".songplay").getElementsByTagName("img")[0].src="images/play2.svg");
            
        })
    })



}

async function just() {
    await displayalbum()
}
just()

var currentsong = new Audio()

function playmusic(track) {
    currentsong.src = track
    currentsong.play()


   
}















function sectomin(seconds) {
    var minutes = Math.floor(seconds / 60);
    var secondsRemaining = parseInt(seconds % 60);


    return `${minutes}:${String(secondsRemaining).padStart(2, '0')}`;
}





async function main() {



    folder = `songs/love`

    // songs = await getsongs(folder)

    // musiclistandplay(folder, songs)

    // path = `/${folder}/` + songs[0]
    // currentsong.src = path
    // document.querySelector(".mar").innerHTML = songs[0]
    // // displaying the music names  to web so that user can click or interact
    // for (const song of songs) {
    //     song1 = song
    //     let ul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    //     ul.innerHTML += `<li>${song1}</li>`
    // }
    // // adding eventlisner to each of the music in targeted folder
    // Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    //     e.addEventListener("click", (element) => {
    //         path = `/${folder}/` + e.innerHTML
    //         currentsong.src = path
    //         currentsong.play()
    //         document.querySelector(".songplay").innerHTML = `<img src="images/play2.svg" alt="">`
    //         document.querySelector(".mar").innerHTML = e.innerHTML
    //     }
    //     )
    // })



    currentsong.addEventListener("timeupdate", () => {
        currenttime = sectomin(currentsong.currentTime)
        duration = sectomin(currentsong.duration)

        document.querySelector(".mduration").getElementsByTagName("span")[0].innerHTML = currenttime
        document.querySelector(".mduration").getElementsByTagName("span")[2].innerHTML = duration
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
        if (currentsong.paused & currentsong.duration == currentsong.currentTime) {
            document.querySelector(".songplay").innerHTML = `<img src="images/play1.svg" alt="">`
        }
        // else{
        //     document.querySelector(".songplay").innerHTML = `<img src="images/play2.svg" alt="">`
        // }
        document.querySelector(".previous").addEventListener("click", () => {
            currentsong.currentTime = currentsong.currentTime - 1
        }
        )

    }
    )

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        // e.target.getBoundingClientReact().width--> it give width of seekbar


        currentsong.currentTime = e.offsetX * currentsong.duration / e.target.getBoundingClientRect().width
        document.querySelector(".circle").style.left = e.offsetX * 98.8 / e.target.getBoundingClientRect().width + "%"


    }
    )

    // code to play audio in loop
    // currentsong.addEventListener('ended', function() {

    //     currentsong.play();
    //   });

    previous = document.querySelector(".previous")
    next = document.querySelector(".next")

    previous.addEventListener("click", (e) => {


        file = currentsong.src.split("/").slice(-1)
        index = songs.indexOf(file[0])
        if (index - 1 >= 0) {
            pat = `/${folder}/` + songs[index - 1]
            document.querySelector(".mar").innerHTML = songs[index - 1]
            playmusic(pat)
            document.querySelector(".songplay").innerHTML = `<img src="images/play2.svg" alt="">`
        }

    }
    )
    next.addEventListener("click", (e) => {
        file = currentsong.src.split("/").slice(-1)
        index = songs.indexOf(file[0])
        if (index + 1 < songs.length) {
            pat = `/${folder}/` + songs[index + 1]
            document.querySelector(".mar").innerHTML = songs[index + 1]
            playmusic(pat)
            document.querySelector(".songplay").innerHTML = `<img src="images/play2.svg" alt="">`
        }



    }
    )


    document.querySelector(".myrange").addEventListener("click", (params) => {
        value = document.querySelector(".myrange")
        max = value.max
        min = value.min
        currentvalue = value.value
        volume = (currentvalue) / (max - min)
        document.querySelector(".vlabel").innerHTML = parseInt(100 * volume)
        currentsong.volume = volume



    }
    )


    document.querySelector(".mute").addEventListener("click", (e) => {
        if (currentsong.muted) {
            currentsong.muted = false
            document.querySelector(".mute").src = "images/volume.svg"
        }
        else {
            currentsong.muted = true
            document.querySelector(".mute").src = "images/mute.svg"
        }
    }
    )










    // Array.from(document.getElementsByClassName("card")).forEach((e) => {
    //     e.addEventListener("click", async (item) => {
    //         // item.target will give where you click that is on Image, paragram , heading etc
    //         // but currenttartget will give when you click on addEventListener element
    //         // console.log(item.target);
    //         currentfoldername = item.currentTarget.dataset.folder
    //         // console.log(currentfoldername);    
    //         folder = folder.split("/")[0] + "/" + currentfoldername
    //         songs = await getsongs(folder)
    //         document.querySelector(".songlist").getElementsByTagName("ul")[0].innerHTML = ""
    //         musiclistandplay(folder, songs)
    //     })
    // })















}
main()











document.querySelector(".songplay").addEventListener("click", () => {

    let htmm = document.querySelector(".songplay").innerHTML
    let htmm1 = `<img src="images/play1.svg" alt="">`
    let htmm2 = `<img src="images/play2.svg" alt="">`
    // if (htmm.search("play1") != -1) {
    //     console.log("play1 found");
    //     htmm = htmm2
    //     document.querySelector(".songplay").innerHTML = htmm2
    // }
    // else if (htmm.search("play2") != -1) {
    //     htmm = htmm1
    //     document.querySelector(".songplay").innerHTML = htmm1
    //     console.log("play2 found");
    // }

    if (currentsong.paused) {
        document.querySelector(".songplay").innerHTML = htmm2
        currentsong.play()





    }
    else {
        document.querySelector(".songplay").innerHTML = htmm1
        currentsong.pause()
    }
}
)


document.querySelector(".hamburger0").addEventListener("click", (e) => {
    document.querySelector(".left").style.left = 0
}
)
document.querySelector(".cross").addEventListener("click", (e) => {
    document.querySelector(".left").style.left = -160 + "%"
}
)































