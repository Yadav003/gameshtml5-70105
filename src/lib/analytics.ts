
// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Track when a game is played
 * @param gameId - The unique identifier of the game
 * @param gameTitle - The title of the game
 * @param gameCategory - The category of the game
 */
export const trackGamePlay = (
  gameId: string,
  gameTitle: string,
  gameCategory: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'game_play', {
      game_id: gameId,
      game_title: gameTitle,
      game_category: gameCategory,
      event_category: 'Games',
      event_label: gameTitle,
    });
    
    // console.log(`Analytics: Game played - ${gameTitle} (${gameId})`);
  }
};

/**
 * Track when a user views a game category
 * @param category - The category name
 */
export const trackCategoryView = (category: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'category_view', {
      category_name: category,
      event_category: 'Navigation',
      event_label: category,
    });
  }
};

/**
 * Track when a user adds/removes a game from favorites
 * @param gameId - The unique identifier of the game
 * @param gameTitle - The title of the game
 * @param action - 'add' or 'remove'
 */
export const trackFavoriteAction = (
  gameId: string,
  gameTitle: string,
  action: 'add' | 'remove'
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action === 'add' ? 'add_to_favorites' : 'remove_from_favorites', {
      game_id: gameId,
      game_title: gameTitle,
      event_category: 'Engagement',
      event_label: gameTitle,
    });
  }
};

/**
 * Track custom events
 * @param eventName - The name of the event
 * @param params - Additional parameters for the event
 */
export const trackCustomEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};
