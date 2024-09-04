const
body = document.querySelector('body'),
beginUrl = body.getAttribute('data-url'),
fetchDataBtn = document.getElementById('fetchData'),
website = document.querySelector('.website'),
example = document.getElementById('example'),
elentItem = document.querySelector('.js_item'),
inputPurpose = document.getElementById('purpose'),
inputApi = document.getElementById('api')

/* validation d'une URL */
function isValidURL(string) {
    try {
        new URL(string)
        return true
    }
    catch (_) {
        return false
    }
}

/* validation d'une image */
function isImageURL(url) {
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i
    return imageExtensions.test(url)
}

/* formate un objet en texte */
function objectToReadableText(obj) {
    let result = ''
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result += `${obj[key]}\n` //${key}:
        }
    }
    return result.trim()
}

async function fetchData(api) {
    try {
        const response = await fetch(api)
        if (!response.ok) {
            //throw new Error(`Erreur HTTP ! statut : ${response.status}`)
            alert('Erreur HTTP ! statut : ' + response.status )
        }
        
        const data = await response.json()
        data.forEach(function(post, index) {
            var
            keys = Object.keys(post),
            article = elentItem.cloneNode(true)
            
            keys.forEach(function(key) {
                article.id = index
                var timestamp = Date.parse( post[key] )
                article.querySelector('[data-api="id"]').textContent = "#" + (index + 1)
                article.classList.remove('hidden')
                
                if ( !isNaN(timestamp) ) {
                    
                }
                else if( isValidURL(post[key]) === true && isImageURL(post[key]) === false) {
                    article.querySelector('[data-api="link"]').href = post[key]
                }
                else if ( isImageURL(post[key]) === true ) {
                    var img = document.createElement('img')
                    img.src = post[key]
                    img.classList.add('w-full')
                    article.querySelector('[data-api="img"]').appendChild(img)
                }
                else if (typeof post[key] === "string" || typeof post[key] === "number" && post[key] !== "") {
                    var span = document.createElement('span')
                    span.setAttribute('data-key', key)
                    span.classList.add('inline-block','bg-gray-200','rounded-full','px-3','py-1','text-sm','font-semibold','text-gray-700','mr-2','mb-2','capitalize')
                    span.textContent = post[key]
                    article.querySelector('[data-api="content"]').appendChild(span)
                }
                else if (Array.isArray(post[key])) {
                    article.setAttribute('data-' + key,  post[key].join(","))
                }
                else if (typeof post[key] === "boolean") {
                    var span = document.createElement('span')
                    span.classList.add('inline-block','rounded-full','px-3','py-1','text-sm','font-semibold','text-gray-700','mr-2','mb-2','capitalize')
                    if(post[key] === true) {
                        span.classList.add('bg-green-200')
                    }
                    else {
                        span.classList.add('bg-red-200')
                    }
                    span.textContent = key
                    article.querySelector('[data-api="content"]').appendChild(span)
                }
                else if (typeof post[key] === "object") {
                    article.querySelector('[data-api="description"]').innerHTML = objectToReadableText(post[key])
                }
                else if (typeof post[key] === null || empty(post[key]) )  {
                    
                }
            })
            website.appendChild(article)
        })
        
        inputPurpose.value = ""
        inputApi.value = ""
    }
    catch (error) {
        //console.error('Erreur lors de la récupération des données:', error)
        alert('data input error')
    }
}

fetchDataBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    
    let url_api = inputApi.value.trim() !== '' ? inputApi.value : inputPurpose.value
    if (url_api === '') {
        alert('data input error')
    }
    
    website.innerHTML = ''
    fetchData(url_api)
})


fetchData(beginUrl)