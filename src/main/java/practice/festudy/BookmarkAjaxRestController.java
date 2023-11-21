package practice.festudy;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookmarkAjaxRestController {

    private List<Bookmark> bookmarks = new ArrayList<>();

    @PostMapping(value = "/bookmark")
    public String registerBookmark(@RequestBody Bookmark bookmark) {
        bookmarks.add(bookmark);
        return "registerd";
    }

    @GetMapping(value = "/bookmarks")
    public List<Bookmark> getBookmarks() {
        return bookmarks;
    }
}
