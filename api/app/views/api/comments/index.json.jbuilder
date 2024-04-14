json.data do
    json.array! @comments do |comment|
        json.id comment.id
        json.feature_id comment.feature_id
        json.body comment.body
        json.created_at comment.created_at
    end
end