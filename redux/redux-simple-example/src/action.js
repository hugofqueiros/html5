/**
 * Created by hugo.queiros on 28/03/16.
 */
export const ITEM_SELECTED = 'ITEM_SELECTED'

export function item_selected(id) {
    return {
        type: ITEM_SELECTED,
        id: parseInt(id)
    }
}