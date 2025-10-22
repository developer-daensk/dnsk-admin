export interface iMedia {
    absoluteUri: string
    thumbnailUrl: string
    mimeType: string
    metaData: {
        OriginalFileSize: string
        StoredHeight: string
        StoredWidth: string
        OriginalHeight: string
        OriginalWidth: string
        HorizontalResolution: string
        VerticalResolution: string
        ActualSize: string
    }
}
