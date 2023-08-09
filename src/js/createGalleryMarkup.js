export function createGalleryMarkup(array) {
    return array.map((obj) => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = obj;
        return `<li class="gallery-item">
                    <a class="gallery-link link" href="${largeImageURL}">
                        <div class="photo-card">
                            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200" />
                            <div class="info">
                                <p class="info-item">
                                <b>Likes</b>
                                ${likes}
                                </p>
                                <p class="info-item">
                                <b>Views</b>
                                ${views}
                                </p>
                                <p class="info-item">
                                <b>Comments</b>
                                ${comments}
                                </p>
                                <p class="info-item">
                                <b>Downloads</b>
                                ${downloads}
                                </p>
                            </div>
                        </div></a></li>`
    }).join('');
}