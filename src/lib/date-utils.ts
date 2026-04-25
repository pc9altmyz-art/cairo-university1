export function getTimeAgo(date: string | number | Date, locale: string = 'ar') {
    if (!date) return locale === 'ar' ? 'الآن' : 'Just now';
    
    const now = new Date();
    const then = new Date(date);
    
    if (isNaN(then.getTime())) {
        return locale === 'ar' ? 'الآن' : 'Just now';
    }

    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return locale === 'ar' ? 'الآن' : 'Just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        if (locale === 'ar') {
            if (diffInMinutes === 1) return 'منذ دقيقة';
            if (diffInMinutes === 2) return 'منذ دقيقتين';
            if (diffInMinutes <= 10) return `منذ ${diffInMinutes} دقائق`;
            return `منذ ${diffInMinutes} دقيقة`;
        }
        return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        if (locale === 'ar') {
            if (diffInHours === 1) return 'منذ ساعة';
            if (diffInHours === 2) return 'منذ ساعتين';
            if (diffInHours <= 10) return `منذ ${diffInHours} ساعات`;
            return `منذ ${diffInHours} ساعة`;
        }
        return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        if (locale === 'ar') {
            if (diffInDays === 1) return 'أمس';
            if (diffInDays === 2) return 'منذ يومين';
            if (diffInDays <= 10) return `منذ ${diffInDays} أيام`;
            return `منذ ${diffInDays} يوم`;
        }
        return `${diffInDays}d ago`;
    }

    return then.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
