const VIDEO_STATUS = {
    UNKNOWN : 'unknown',
    UPLOADED: 'uploaded',
    PENDING : "pending",
    PROCESSED : "processed",
    PUBLISHED : "published"
};


const VIDEO_QUEUE_EVENTS = {
    VIDEO_UPLOADED: 'video.uploaded',
    VIDEO_PROCESSING: 'video.processing',
    VIDEO_PROCESSED: 'video.processed',
    VIDEO_THUMBNAIL_GENERATED: 'video.thumbnail.generated',
    VIDEO_HLS_CONVERTING: 'video.hls-converting',
    VIDEO_HLS_CONVERTED: 'video.hls.converted',
  };
  const NOTIFY_EVENTS = {
    NOTIFY_VIDEO_HLS_CONVERTED: 'notify.video.hls.converted',
  };
  const ALL_EVENTS = {
    ...VIDEO_QUEUE_EVENTS,
    ...NOTIFY_EVENTS,
  };
  
  export {
    VIDEO_QUEUE_EVENTS,
    VIDEO_STATUS,
    NOTIFY_EVENTS,
    ALL_EVENTS
  }